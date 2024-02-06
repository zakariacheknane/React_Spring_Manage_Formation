# Training Manager

Welcome to our end-of-module project - Development of a web application for managing a training center. This application provides a comprehensive solution for managing training project documents, planning training sessions, assigning trainers, managing training costs, and much more.

## Objectives

- Manage training project documents.
- Plan training sessions and assign trainers.
- Manage training costs.

## Features

1. **Authentication :** Authentication interface for roles: admin, trainer, and assistant.
2. **Training Management :**  Admin adds a public training session, specifying the duration, cost, objectives, and detailed program.
3. **Trainer Management :** Admin adds trainers, specifying a set of keywords that characterize their skills (also including a remarks field).
4. **Company Management :** Admin or assistant adds a list of companies characterized by name, address, phone number, URL, and email.
5. **Training Scheduling :** Admin and assistant can schedule a new training session by assigning a trainer and a company to a set of dates on the calendar.
6. **Individual Registration :** If the training is for individuals, they can register (providing name, date of birth, city, email, and phone number) via a dedicated form on the homepage, choosing the desired training. Then, the admin or assistant assigns the trainer to the group of individuals.
7. **Public Homepage :** The homepage is public, displaying all the training sessions added by the admin with simple filters on the category of training, city, and date.
8. **Training Evaluation :** Participants receive a link to a training evaluation form where they rate the trainer's pedagogical quality, pace, course material support, and mastery of the subject.
9. **External Trainer Registration :** An external trainer can express interest in conducting a training session by signing up as a trainer on the platform, providing keywords that reflect their profile.
10. **Global Considerations :** Consideration of ergonomics, graphic design, layered modeling, security, and code simplicity.


## Getting Started Guide
### Clone
 Clone the repository:
  ```bash
   git clone [https://github.com/zakariacheknane/React-Users-List.git](https://github.com/zakariacheknane/React_Spring_Manage_Formation.git)
   ```

### Backend

1. Import "Backend/Mange_Formation_Backend" into your Spring Tool Suite or IntelliJ.
2. Run the project as a Spring Boot application.
   
### Frontend

1. Navigate to "Frontend/Mange_Formation_React".
```bash
cd path/to/Frontend/Mange_Formation_React
```

2. Install dependencies.
```bash
npm install
```

3. Launch the frontend application.
```bash
npm start 
```
## Technologies Used
- Backend : Spring Boot
- Frontend : React 
- Database : MySQL

Thank you for taking the time to review our project. We look forward to receiving your feedback. 🚀


