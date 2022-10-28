# Assn_Clapingo


Project - Build APIs using node.js, express.js, mongoose & MongoDB where 
          students can log in, 
          add a teacher to their favorite, 
          remove the teacher from their favorite list and 
          find most favorite teacher 
          
          
Features - JWT authentication for signup/signin/signout of students.
           Password hashing using bcryptjs.
           MongoDB aggregation to find the most favorite teacher.
           Validator to check whether name,email,password are acceptable or not.
           Express middleware functionality is leveraged to check whether the api calls are authorized.
           Students can maintain list of their favorite teachers by adding and removing available teachers into the list.
           Along with above features CRUD operations can be performed on Student and Teacher collection 


How to Install and Run the Project - 
          1. Download and extract the project.
          2. On the database server(refer below examples).
          3. Run "npm install" command in the terminal to install all the required npm libraries.
          4. Run "node app.js" command in the terminal to connect to the database and run the express server.
          5. Call the apis using Postman(take care of authorization,refer below examples).
          6. Check the database using MongoDB Compass/Studio 3T.
          
          
Examples - 

1. On the database - 
           /Users/mongodb/bin/mongod --dbpath=/Users/mongodb-data
          ![image](https://user-images.githubusercontent.com/68046450/198649995-e6a91549-1358-427c-b593-25c559988e66.png)

2. Run the project - 
          npm install
          ![image](https://user-images.githubusercontent.com/68046450/198651356-e3fa7094-b03d-4c17-9ecb-5904d0162e44.png)

3. Snapshot of the database - 

          ![image](https://user-images.githubusercontent.com/68046450/198652403-dec4015e-c505-415c-93e0-9a664457a148.png)
          
          students - 
                    ![image](https://user-images.githubusercontent.com/68046450/198653024-c5481ef8-b64b-45b2-b7d9-f2154c556a8d.png)
          
          teachers - 
                    ![image](https://user-images.githubusercontent.com/68046450/198653372-56423703-7923-4cbc-b3d7-d7c3fb5202af.png)

4. Postman Screenshots - 
          
          Environment - 
                     ![image](https://user-images.githubusercontent.com/68046450/198654546-f5ae7274-e6b9-4003-8ab4-653b9ba0dcc4.png)
          
          Requests - 
                    ![image](https://user-images.githubusercontent.com/68046450/198655173-8c665862-f3df-407d-985c-82f64801f19d.png)

          Signup - 
                  ![image](https://user-images.githubusercontent.com/68046450/198655861-a5add622-cc58-44e2-840a-dcf7f7e18dd5.png)
                  ![image](https://user-images.githubusercontent.com/68046450/198655955-9489ff84-ffbf-4c73-ae1b-fc488450684d.png)

          Signout - 
                  ![image](https://user-images.githubusercontent.com/68046450/198656289-228b3cd1-5ed3-47da-afbe-adc5fe230f61.png)

          Student retrieval - 
                  ![image](https://user-images.githubusercontent.com/68046450/198657278-da18cb43-6464-458b-8236-500e8e1a7555.png)

          Get all teachers - 
                  ![image](https://user-images.githubusercontent.com/68046450/198657764-a5a4963e-0efd-47b5-9254-6883f4b3d728.png)

          Favorite teacher - 
                  ![image](https://user-images.githubusercontent.com/68046450/198658221-e4055a79-9afc-4ddd-a053-d325f1185eac.png)



          
