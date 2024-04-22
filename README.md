API Request and JSONs:

Request Url: https://www.alibiner.com/api/register <br>
HTTP-METHOD: POST <br>
CONTENT-TYPE: application/json <br>
BODY: <br>
{<br>
  "firstName":"", <br>
  "lastName":"", <br>
  "middleName":null, <br>
  "email":"", <br>
  "password":"", <br>
  "repeatPassword":"" <br>
}

Response Time for Cloud Server(PostgreSQL Cloud Server on ElephantSQL)(Free Service) and Local API Server : 80-90 ms <br>
Response Time for Cloud Server and API Server on Render Hosting(Free Service - 0.1 CPU and 512 Mb Ram) : 400-500 ms 

The logics in this request:<br>

  <li>Request Json Validation with JOI</li>
  <li>Email Control for Unique</li>
  <li>Password Crypt with bcrypt</li><br>
  <hr>
Request Url: https://www.alibiner.com/api/login <br>
HTTP-METHOD: POST <br>
CONTENT-TYPE: application/json <br>
BODY: <br>
{<br>
  "firstName":"", <br>
  "lastName":"", <br>
  "middleName":null, <br>
  "email":"", <br>
  "password":"", <br>
  "repeatPassword":"" <br>
}

Response Time for Cloud Server(PostgreSQL Cloud Server on ElephantSQL)(Free Service) and Local API Server : 80-90 ms <br>
Response Time for Cloud Server and API Server on Render Hosting(Free Service - 0.1 CPU and 512 Mb Ram) : 150-200 ms 

The logics in this request:<br>
  <li>Request Json Validation with JOI</li>
  <li>Email and Password Control </li>
  <li>Create Token</li>
