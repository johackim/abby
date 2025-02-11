#!/usr/bin/env node

import 'dotenv/config';
import {
    deleteAllIncomeBookEntries,
    createIncomeBookEntries,
    getIncomeBookEntries,
    filterEntriesByMonth,
} from './utils.mjs';

const params = process.argv.slice(2);

if (params.includes('--sync')) {
    await deleteAllIncomeBookEntries();
    await createIncomeBookEntries();
}

if (params.includes('--delete')) {
    await deleteAllIncomeBookEntries();
}

if (params.includes('--create')) {
    await createIncomeBookEntries();
}

if (params.includes('--incomes')) {
    const incomes = await getIncomeBookEntries();

    console.log(`Total income last month: ${await filterEntriesByMonth(incomes, 'last')}€`);
    console.log(`Total income this month: ${await filterEntriesByMonth(incomes, 'current')}€`);
}

if (params.length === 0) {
    console.error('Please provide a flag: --sync, --delete, --create or --incomes');
}
