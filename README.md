# Pocket Penalty Box Manager

visit : [https://keyobs.github.io/pocket-pbt/](https://keyobs.github.io/pocket-pbt/)

Backup timers for roller derby penalty box when you forget to buy batteries.

The Pocket Penalty Box Manager is a web app designed to serve as a reliable backup for the official penalty box timers in roller derby.

<br>

<p align="center">
<img src="./assets/pbt-screen.png" alt="Penalty Box Timer screen" width="500"/>
</p>

<br>

## ✨ Features

The app is mobile-friendly.

Available :

- 6 countdown timers for each six penalty box seats
- Colored stroke helper
- Customize your own color set

Flexible Timing Configurations:

- Track time for 1 or 2 teams
- Track only jammers
- Track only blockers

Automated Jammer Management :

- Automatically swaps a jammer’s active timer when a new jammer is sent to the box.

<br>

<p align="center">
<img src="./assets/pbt-screen-running.png" alt="Penalty Box Timer screen" width="500"/>
</p>

<br>
<br>

## NEW TO ROLLER DERBY ?

The sport = [WFTDA - The Game ](https://wftda.com/the-game/)  
The rules = [WFTDA - The Rules of Flat Track Roller Derby](https://rules.wftda.com/)

<br>
<br>

## 💻 Stack

Project is open-source.  
Feel free to fork and/or contribute.

Built with React and Vite.  
Enforce pnpm use.

**Frontend**

- React **19** + TypeScript
- Less (styling preprocessor)
- Vite (building tool)
- pnpm (package manager)

**Code Quality**

- ESLint + TypeScript ESLint (linter)
- Vitest (unit and component testing)
- Husky (commit guard)

**Monitoring**

- Sentry (crash and errors monitoring)
  - optionnal - disabled if no DSN
  - uses secure tunnel on Netlify (prevents ad blockers, keep sentry dsn secret)

**CI/CD & Tooling**

- GitHub Pages (deployment)
- gh-pages (deployment helper)
- only-allow (ensures pnpm usage)

**Hosting**

Project lives at :

- Github Pages : [https://keyobs.github.io/pocket-pbt/](https://keyobs.github.io/pocket-pbt/)
- Netlify : [https://pocket-pbt.netlify.app/](https://pocket-pbt.netlify.app/)

<br>
<br>

## 💻 Developper Setup

To get started and contribute, follow these steps:

### Prerequisites

Node.js: Ensure you have Node.js installed on your machine.

### Installation

Clone the repository:

```
git clone https://github.com/keyobs/pocket-pbt.git
```

Navigate to the project directory:

```
cd pocket-pbt
```

Install dependencies:

```
pnpm install
```

Running the Project : start the development server:

```
pnpm run dev
```

Launch the app at http://localhost:5173/ (or a similar port).
Hotload active : the page will automatically reload as you make changes.

<br>

📜 License  
This project is licensed under the MIT License. For more details, see the LICENSE file in this repository.

<br>

🤝 Contributing  
We welcome contributions from the community !  
If you're interested in helping, please check out our CONTRIBUTING.md file for guidelines on setting up your environment, submitting pull requests, and coding standards.
