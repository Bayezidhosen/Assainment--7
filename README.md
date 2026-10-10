
# 🛒 BazarDor — বাজার দর

**BazarDor** is a modern web application designed to help users browse products, explore categories, and access product market information through a clean and responsive interface.

## ✨ Features

* 🛍️ Browse products in a responsive product grid.
* 📂 Explore products by category.
* ↕️ Sort products by price, where available.
* 🔐 Sign up and sign in using email and password.
* 🌐 Google and GitHub authentication integration.
* 👤 User authentication powered by Better Auth.
* 🗄️ MongoDB database integration.
* 📱 Responsive design for desktop, tablet, and mobile devices.
* 🎨 Modern user interface built with Tailwind CSS.

## 🧰 Technologies Used

* **Next.js** — React framework
* **React** — UI development
* **TypeScript** — Type-safe development
* **Tailwind CSS** — Styling and responsive design
* **Better Auth** — Authentication
* **MongoDB** — Database
* **Sonner** — Toast notifications, where used

## 🚀 Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Navigate to the Project Directory

```bash
cd <YOUR_PROJECT_FOLDER>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project.

Add the following variables using your own credentials:

.env
BETTER_AUTH_SECRET=pxSypCpotvEtJBh4lWh2sKbK9dV
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://bazardor:mkbjKP0iRrhcYxLy@cluster0.oscwqjb.mongodb.net/?appName=Cluster0


GOOGLE_CLIENT_ID=359687451153-k0iljg6jriov9iscleln7mke73k83m6o.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

GITHUB_CLIENT_ID=080928af10bbef5c907c45f947eb0a9fa78838cb
GITHUB_CLIENT_SECRET=Ov23liFXLnvpekbGNQTQ


**Important:** Ensure that the environment variable names match those used in your project configuration. Never share or commit your real credentials.

### 5. Configure Google OAuth

In Google Cloud Console, configure your OAuth client and add the following authorized redirect URI for local development:

```text
http://localhost:3000/api/auth/callback/google
```

### 6. Configure GitHub OAuth

In your GitHub OAuth App settings, set the local callback URL to:

```text
http://localhost:3000/api/auth/callback/github
```

### 7. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

http://localhost:3000

## 🔐 Authentication

BazarDor uses Better Auth for authentication features.

Supported authentication methods may include:

* Email and password
* Google OAuth
* GitHub OAuth

Social authentication requires valid provider credentials and a correctly configured Better Auth API route.

## 📁 Project Structure

The following is an example structure. Adjust it to match the actual files in your repository.

text
BazarDor/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── auth-client.ts
│   │   └── mongodb.ts
│   └── types/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md


## 📜 Available Commands

```bash
npm run dev
```

Start the development server.

```bash
npm run build
```

Build the application for production.

```bash
npm run start
```

Start the production server after building.

```bash
npm run lint
```

Run lint checks if this script is configured in `package.json`.

## 🌍 Deployment

Before deploying the application:

1. Run a production build and resolve any errors.
2. Configure environment variables in your hosting platform.
3. Set `BETTER_AUTH_URL` to the production URL.
4. Register production callback URLs in Google Cloud Console and GitHub.
5. Verify that the MongoDB connection works in production.
6. Test sign-up, sign-in, sign-out, and social authentication.
7. Ensure that sensitive credentials are not committed to Git.

## 🔒 Security Notes

* Keep `.env` out of version control.
* Use a strong, randomly generated Better Auth secret.
* Never expose OAuth client secrets in client-side code.
* Review account-linking settings carefully before enabling automatic linking between authentication providers.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Create a feature branch.
2. Make your changes.
3. Test your changes locally.
4. Submit a pull request with a clear description.

## 📄 License

No license has been specified yet. Add an appropriate license if you intend to distribute the project publicly.

---


