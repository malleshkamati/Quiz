# 🧠 Quiz Web Application

> A robust online examination platform featuring real-time proctoring , dynamic quiz management for admins, and comprehensive performance dashboards for users.

## 📖 Overview

This project is a full-featured **Quiz Web Application** designed to facilitate secure and efficient online assessments. It bridges the gap between administrators and candidates by providing a seamless interface for creating, managing, and attempting quizzes.

A standout feature is the **Automated Proctoring System**, which ensures integrity by detecting tab switches and auto-submitting the quiz if a candidate attempts to cheat.

---

## ✨ Features

### 🛡️ Admin Module
Empowers administrators with full control over the assessment process.

*   **Quiz Management**
    *   **Create Quizzes:** effortless setup of new quizzes with custom questions.
    *   **Edit Capabilities:** Modify quiz details, questions, or options even after creation.
    *   **Timer Configuration:** Set specific time limits for each quiz to ensure standardized testing conditions.
*   **Candidate Monitoring**
    *   **Scoreboard:** View scores of all candidates in one centralized list for admins.
    *   **Response Analysis:** Deep dive into individual candidate responses to analyze performance.
*   **Account Management**
    *   **Profile Dashboard:** View personal quiz results  and account stats.
    *   **Security:** Secure password change functionality.

### 👤 User (Candidate) Module
Provides a clean and distraction-free environment for candidates.

*   **Assessment Interface:** Intuitive UI for attempting quizzes.
*   **Anti-Cheating Security:**
    *   **Tab Switch Detection:** The system monitors the browser tab. If the user switches tabs during the quiz, the test is **automatically submitted** to prevent malpractice.
    *   **Copy–Paste Restriction**:The quiz interface blocks copying, pasting. Any attempt to copy or paste text triggers an alert, and repeated attempts can lead to automatic submission of the test.
*   **Performance Dashboard:** A personal profile showing the history of all quizzes taken and scores achieved.
*   **Account Management:** Easy profile updates and password change options.

---

## 🛠️ Tech Stack


*   **Frontend:**React.js
*   **Backend:**  Node.js with expressjs
*   **Database:**  PostgreSQL

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

*   [Your-Language-Requirement] (e.g., Node.js v14+ or Python 3.8+)
*   [Your-Database] (e.g., MySQL Server running on port 3306)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/malleshkamati/Quiz.git
    cd Quiz
    ```

2.  **Install Dependencies**
    ```bash
    # Example for Node.js
    npm install

    # Example for Python
    pip install -r requirements.txt
    ```


3.  **Run the Application**
    ```bash
    # Example for Node.js
    npm start

    

4.  **Access the App**
    Open your browser and navigate to `http://localhost:3000` (or your configured port).

---

## 📸 Screenshots

<details>
<summary>Click to view Admin Screenshots</summary>

| Create Quiz | Admin Dashboard |
|:---:|:---:|
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f224e721-c370-4804-a1f0-cc6479be7b1b" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5e213ce3-b654-49d0-af43-8c67fcdb30d2" />
<img width="1916" height="514" alt="image" src="https://github.com/user-attachments/assets/23a3e402-db4f-46c1-adbe-b0dd7161bf71" />
<img width="947" height="532" alt="image" src="https://github.com/user-attachments/assets/14c00c44-1940-4f82-bdcb-dfa365e9a9b2" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cd5f42d8-80c6-4ac2-90fb-72dec6c7c02f" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5d19ed24-0de9-48e7-b93d-69081409810f" />
<img width="1255" height="571" alt="image" src="https://github.com/user-attachments/assets/5a458c4d-47fc-4a1c-986a-ed096d3c5449" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cad0c469-0af3-497f-b18f-0e20e4ee16cd" />

</details>

<details>
<summary>Click to view User Screenshots</summary>

| Quiz Interface | Tab Switch Warning |
|:---:|:---:|
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/79ca421c-87ed-4477-bdd5-9aa2eb7fbe7a" />
<img width="1916" height="514" alt="image" src="https://github.com/user-attachments/assets/d0f4b0f5-e984-47ed-886b-79928bb15cd3" />


</details>

---




