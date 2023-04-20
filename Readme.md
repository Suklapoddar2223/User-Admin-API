1. User Admin Api Creating Steps:
cd
a. Created Server folder for backend and Client folder for frontend.
b. created src folder inside the server.
c. neccesary folders created inside src->models routes contollers helpers config validators middleware .
d. create index.js for creating server.

2. npm init -y
packeges installed:
npm install express nodemon dotenv
further installation done:
morgan mongoose
in models creating user.js for user profile.

3. Create User
   . Create schema & models
   . given condition for name,email,passowrd,phone image
   . default condition created like is_admin & is_verified
   . Create controller for users registration res and req. with miidleware formidable

4. Packages downloaded:
   . cookie-parser
   . express-session