# Abby

Synchronize your Stripe invoices with Abby.fr

## 📋 Requirements

- **Node.js (v14+)**
- **Stripe Account** with paid invoices available
- **Abby.fr Account** with an [API token](https://app.abby.fr/settings/integrations)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/johackim/abby.git
```

2. **Install dependencies**

```bash
cd abby
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory with the following content:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
ABBY_API_TOKEN=your_abby_api_token
PAYMENT_METHOD=9 # Stripe
PRODUCT_TYPE=2 # Prestations de services
```

## 📦 Usage

> [!WARNING]
> This script will delete all existing income book entries in Abby and replace them with the synchronized Stripe invoices.

Run the script to synchronize your Stripe invoices with Abby.fr:

```bash
node index.mjs --sync
```

The script performs the following tasks:

- **Deletes all existing income book entries** from Abby.
- **Fetches all paid invoices** from Stripe.
- **Creates new income book entries** in Abby using invoice details such as reference number, client information, date, total amount, and a link to the PDF invoice.

## 🔧 Customization

You can customize the script by modifying the following environment variables:

- **PRODUCT_TYPE**: (Default is `2` representing "Prestations de services")
- **PAYMENT_METHOD**: (Default is `9`, corresponding to "Stripe")

Feel free to fork the project and tailor it to your specific needs.

## 🎁 Support me

I'd love to work on this project, but my time on this earth is limited, support my work to give me more time!

Please support me with a one-time or a monthly donation and help me continue my activities.

[![Github sponsor](https://img.shields.io/badge/github-Support%20my%20work-lightgrey?style=social&logo=github)](https://github.com/sponsors/johackim/)
[![ko-fi](https://img.shields.io/badge/ko--fi-Support%20my%20work-lightgrey?style=social&logo=ko-fi)](https://ko-fi.com/johackim)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support%20my%20work-lightgrey?style=social&logo=buy%20me%20a%20coffee&logoColor=%23FFDD00)](https://www.buymeacoffee.com/johackim)
[![liberapay](https://img.shields.io/badge/liberapay-Support%20my%20work-lightgrey?style=social&logo=liberapay&logoColor=%23F6C915)](https://liberapay.com/johackim/donate)
[![Github](https://img.shields.io/github/followers/johackim?label=Follow%20me&style=social)](https://github.com/johackim)
[![Mastodon](https://img.shields.io/mastodon/follow/1631?domain=https%3A%2F%2Fmastodon.ethibox.fr&style=social)](https://mastodon.ethibox.fr/@johackim)
[![Twitter](https://img.shields.io/twitter/follow/_johackim?style=social)](https://twitter.com/_johackim)

## 📜 License

This project is licensed under the GNU GPL v3.0 - see the [LICENSE.txt](https://raw.githubusercontent.com/johackim/abby/master/LICENSE.txt) file for details

**Free Software, Hell Yeah!**
