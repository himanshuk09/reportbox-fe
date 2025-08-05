# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
    npx expo start
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
  app/
  ├── (public)/
  │ ├── \_layout.tsx
  │ ├── welcome.tsx
  │ ├── signin.tsx
  │ ├── otp-verification.tsx
  │ ├── verify.tsx
  │ └── user-details-form.tsx
  │
  ├── (protected)/
  │ ├── \_layout.tsx ← Drawer layout
  │ │
  │ ├── (tabs)/ ← Bottom tabs inside drawer
  │ │ ├── \_layout.tsx
  │ │ ├── dashboard.tsx
  │ │ ├── feed.tsx ← Complaint list
  │ │ ├── notification.tsx
  │ │ └── progress.tsx
  │ │
  │ ├── complaint/ ← Complaint nested stack
  │ │ ├── add.tsx
  │ │ ├── history.tsx
  │ │ ├── type-list.tsx
  │ │ ├── progress.tsx
  │ │ ├── view/
  │ │ │ └── [id].tsx
  │ │ ├── edit/
  │ │ │ └── [id].tsx
  │ │
  │ ├── admin/ ← Admin section
  │ │ ├── users/
  │ │ │ ├── index.tsx ← all users
  │ │ │ ├── [id].tsx ← user profile
  │ │ │ ├── [id]-complaints.tsx ← all complaints of a user
  │ │ │ └── edit-complaint/
  │ │ │ └── [id].tsx ← edit assigned complaint
  │ │ ├── rights/
  │ │ │ ├── groups.tsx
  │ │ │ ├── rights.tsx
  │ │ │ ├── group-rights.tsx
  │ │ │ └── group-users.tsx
  │
  │ ├── profile/
  │ │ ├── view.tsx
  │ │ └── edit.tsx
  │
  │ └── settings/
  │ └── index.tsx
  │
  ├── \_layout.tsx ← Root layout that redirects to (public) or (protected)
  ├── \_app.tsx ← Optional global config
  └── index.tsx ← Optional redirect to (public)/welcome
