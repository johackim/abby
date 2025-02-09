#!/usr/bin/env node

import 'dotenv/config';
import Stripe from 'stripe';

const PRODUCT_TYPE = process.env.PRODUCT_TYPE || 2; // 2 = Prestations de services (BNC)

const PAYMENT_METHOD = process.env.PAYMENT_METHOD || 9; // 9 = Stripe

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const sleep = async (ms) => new Promise((r) => { setTimeout(r, ms); });

export const createIncomeBookEntry = async (invoice) => {
    await fetch('https://app.abby.fr/api/incomeBook', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.ABBY_API_TOKEN}`,
            'Content-Type': 'application/json',
            Referer: 'https://app.abby.fr',
        },
        body: JSON.stringify({
            paidAt: invoice.date,
            client: invoice.client,
            productType: invoice.type,
            reference: invoice.reference,
            priceTotalTax: invoice.amount,
            priceWithoutTax: invoice.amount,
            paymentMethodUsed: { value: invoice.paymentMethod },
            file: {
                extension: 'pdf',
                mimeType: 'application/pdf',
                url: invoice.url,
            },
        }),
    });
};

export const getIncomeBookEntries = async () => {
    const response = await fetch('https://app.abby.fr/api/incomeBook/items?page=1&limit=100000', {
        headers: {
            Authorization: `Bearer ${process.env.ABBY_API_TOKEN}`,
            'Content-Type': 'application/json',
            Referer: 'https://app.abby.fr',
        },
    });

    const { docs } = await response.json();

    return docs;
};

export const deleteIncomeBookEntry = async (id) => {
    await fetch(`https://app.abby.fr/api/incomeBook/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${process.env.ABBY_API_TOKEN}`,
            'Content-Type': 'application/json',
            Referer: 'https://app.abby.fr',
        },
    });
};

export const deleteAllIncomeBookEntries = async () => {
    const entries = await getIncomeBookEntries();

    for await (const entry of entries) {
        console.log(`Deleting entry ${entry._id}`);

        await deleteIncomeBookEntry(entry._id);
    }
};

export const createIncomeBookEntries = async () => {
    await stripe.invoices.list({ status: 'paid' }).autoPagingEach(async (invoice) => {
        await sleep(500);

        if (invoice.amount_paid === 0) return;

        console.log(`Processing invoice ${invoice.number}`);

        await createIncomeBookEntry(({
            reference: invoice.number,
            client: invoice.customer_name || invoice.customer_email,
            date: new Date(invoice.created * 1000).toISOString(),
            amount: invoice.amount_paid,
            url: invoice.invoice_pdf,
            type: Number(PRODUCT_TYPE),
            paymentMethod: Number(PAYMENT_METHOD),
        }));
    });
};

await deleteAllIncomeBookEntries();
await createIncomeBookEntries();
