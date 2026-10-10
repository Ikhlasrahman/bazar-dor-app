# Bazar Dor — বাজারদর

Bazar Dor is a Bangla-language market price application designed to help users explore daily prices of essential products in Bangladesh. Users can browse product categories, compare current prices with historical prices, and view market-wise price information.

## Features

- **Product Categories:** Browse products by categories such as rice, lentils, oil, vegetables, fish, meat, eggs, and spices.
- **Daily Price Tracking:** View today's prices alongside yesterday's, last week's, and last month's prices.
- **Price Changes:** Identify whether product prices have increased, decreased, or remained unchanged.
- **Market-wise Prices:** View price ranges by market and division on product detail pages.
- **Sorting:** Sort category products by price, price changes, or product name.
- **Authentication:** Sign up and sign in using email and password, Google, or GitHub.
- **User Profile:** View and update profile information.
- **Protected Routes:** Restrict access to product pages to authenticated users.
- **Responsive UI:** Browse the application on desktop and mobile devices.
- **Custom Not Found Page:** Display a dedicated page when a requested route or resource cannot be found.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS and DaisyUI
- **Authentication:** Better Auth
- **Database:** MongoDB
- **Data Source:** Bazar Dor API

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (a version supported by your installed Next.js release)
- npm
- Git

You will also need a MongoDB Atlas database and OAuth credentials if you want to use Google and GitHub sign-in.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

Replace the placeholders with your actual GitHub repository URL and project directory name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your Better Auth and MongoDB configuration.

For example:

```env
BETTER_AUTH_MONGODB=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Important:** These names are examples based on a typical configuration. Verify them against your actual source code and existing `.env.local` file. If your project uses different names, keep the names your code expects.

Never commit `.env.local` or expose database credentials, authentication secrets, or OAuth client secrets in a public repository.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## API

The application retrieves product and category data from the Bazar Dor API.

**Base URL:**

```text
https://api.abcz.workers.dev/api/bazardor
```

| Endpoint | Description |
|---|---|
| `/categories` | Retrieve product categories |
| `/products` | Retrieve all products |
| `/products?category=chal` | Filter products by category |
| `/products/1` | Retrieve a product and its market information |

Replace the example product ID or category slug with the value you want to query.

## Project Structure

```text
src/
├── app/
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── signin/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/
│   └── products/
├── lib/
├── services/
└── types/
```

This is a simplified overview. The exact structure may differ depending on your latest project changes.

## Deployment

This project can be deployed on [Vercel](https://vercel.com/).

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in your Vercel project settings.
4. Set the production authentication URL to your deployed domain.
5. Update the Google and GitHub OAuth callback settings to match your production domain and Better Auth configuration.
6. Deploy and test the application.

## Security

- Keep `.env.local` out of version control.
- Use a strong, unique production authentication secret.
- Configure the correct production URL and trusted origins.
- Verify authentication and protected routes after deployment.

## License

No license has been specified yet. Add a license before distributing or reusing this project under particular terms.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
