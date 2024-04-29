API Request and JSONs:

Request Url: https://www.alibiner.com/api/email-exists <br>
HTTP-METHOD: POST <br>
CONTENT-TYPE: application/json <br>
BODY: <br>
{<br>
"email":"", <br>
}

Response Time for Cloud Server(PostgreSQL Cloud Server on ElephantSQL)(Free Service) and Local API Server : ~80 ms <br>
Response Time for Cloud Server and API Server on Render Hosting(Free Service - 0.1 CPU and 512 Mb Ram) : 300 ms

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
Response Time for Cloud Server and API Server on Render Hosting(Free Service - 0.1 CPU and 512 Mb Ram) : 300 ms

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
<hr>
<br>
<h1>Single Thread Process on Node.js</h1>
The more requests, the longer the response time will be due to the queue. Cluster is used as a solution to this. Cluster will create as many node instances as the number of threads we specify. When tested with Loadtest, it was seen that it provides significant load balancing.

<h3>Single Thread Performance:<br></h3>
<dl>
  <dt>Loadtest Command:</dt>
  <dd style="color:red">Please Send Login Request For Token</dd>
  <dd style="color:red">rps is request per second</dd>
  <dd style="color:red">n is max request number</dd>
  <dd>loadtest -H authorization:"Bearer (token)"  --rps 1000 -n 1000 https://www.alibiner.com/api/me-one-thread</dd>
 <br>
  <dt> LoadTest Performance for 1000 Request:</dt>
  <dd>
  Max requests:        1000<br>
Target rps:          1000<br>
Concurrent clients:  1670<br>
Running on cores:    4<br>
Agent:               none<br><br>

Completed requests: 1000<br>
Total errors: 0<br>
Total time: 76.301 s<br>
Mean latency: 36851.9 ms<br>
Effective rps: 13<br>
<br>
Percentage of requests served within a certain time<br>
50% 36514 ms<br>
90% 67919 ms<br>
95% 71480 ms<br>
99% 74568 ms<br>
100% 75301 ms (longest request)<br>

 </dd>
  </dl>
  <br>

<h1>Multi Thread with Cluster on Node.js</h1>
<p>I used only 5 thread because my postgresql db server support 5 concurrent connections </p>

<h3>Multi Thread Performance:<br></h3>
<dl>
  <dt>Loadtest Command:</dt>
  <dd style="color:red">Please Send Login Request For Token</dd>
  <dd style="color:red">rps is request per second</dd>
  <dd style="color:red">n is max request number</dd>
  <dd>loadtest -H authorization:"Bearer (token)"  --rps 1000 -n 1000 https://www.alibiner.com/api/me-one-thread</dd>
 <br>
  <dt> LoadTest Performance for 1000 Request:</dt>
  <dd>
Max requests:        1000 <br>
Target rps:          1000 <br>
Concurrent clients:  2360 <br>
Running on cores:    4<br>
Agent:               none<br>
<br>
Completed requests:  1000<br>
Total errors:        0<br>
Total time:          39.137 s<br>
Mean latency:        22051.9 ms<br>
Effective rps:       26<br>
<br>
Percentage of requests served within a certain time<br>
  50%      24764 ms<br>
  90%      35632 ms<br>
  95%      36385 ms<br>
  99%      36971 ms<br>
 100%      37470 ms (longest request)<br>

 </dd>
  </dl>
<br>
<br>
<table><tr>
<th></th>
<th>Single Thread</th>
<th>Multi Thread (for 5)</th>

</tr>
<tr>
<td>Requests</td>
<td>1000</td>
<td>1000</td>
</tr>

<tr>
<td>Total time</td>
<td>76.301 s</td>
<td>39.137 s</td>

</tr>
<tr>
<td>Concurrent clients</td>
<td>1670</td>
<td>2360</td>

</tr>
<tr>
<td>Mean latency</td>
<td>36851.9 ms</td>
<td>22051.9 ms</td>

</tr>
<tr>
<td>Effective rps(Request per Second)</td>

<td>13</td>
<td>26</td>

</tr>

</table>
