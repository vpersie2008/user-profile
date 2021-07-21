# Customer profile center


A system for introducing software developers, you can easily learn about other developers and use it to make other new friends


## 1. Feature:

- Introduce your self to other developers.
- Learn about other developers.
- Show personal experience and educational experience to oher developers
- Comment and like developers.
- View other developer's github quickly.

## 2. Characteristic

## 3. Target users

- Developers
- Software engineer.
- Headhunter or Human resource.
- College student.

## 4. Development environment

- Windows、Linux
- VSCode
- Node.js ≧10

## 5. Technology selection

- ### 5.1 Backend framework

<table>
<thead>
<tr>
<th align="left">Technology</th>
<th align="left">Description</th>
<th align="left">Official website</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Node.js</td>
<td align="left">A Javascript engine</td>
<td align="left"><a href="https://nodejs.org/en/" rel="nofollow">https://nodejs.org/en/</a></td>
</tr>

<tr>
<td align="left">Express</td>
<td align="left">A web service</td>
<td align="left"><a href="https://www.npmjs.com/package/express" rel="nofollow">https://www.npmjs.com/package/express</a></td>
</tr>

<tr>
<td align="left">MongoDB</td>
<td align="left">A document type NoSql database</td>
<td align="left"><a href="https://www.mongodb.com/" rel="nofollow">https://www.mongodb.com/</a></td>
</tr>

<tr>
<td align="left">mongoose</td>
<td align="left">Elegant mongodb object modeling for node.js</td>
<td align="left"><a href="http://www.mongoosejs.net/" rel="nofollow">http://www.mongoosejs.net/</a></td>
</tr>


<tr>
<td align="left">jsonwebtoken</td>
<td align="left">An implementation of JSON Web Tokens.</td>
<td align="left"><a href="https://jwt.io/introduction/" rel="nofollow">https://jwt.io/introduction/</a></td>
</tr>

<tr>
<td align="left">passport</td>
<td align="left">A Passport strategy for authenticating with a JSON Web Token.</td>
<td align="left"><a href="https://www.npmjs.com/package/passport-jwt/" rel="nofollow">https://www.npmjs.com/package/passport-jwt/</a></td>
</tr>

<tr>
<td align="left">bcrypt</td>
<td align="left">A library to help you hash passwords.</td>
<td align="left"><a href="https://www.npmjs.com/package/bcrypt/" rel="nofollow">https://www.npmjs.com/package/bcrypt/</a></td>
</tr>

<tr>
<td align="left">validator</td>
<td align="left">A library of string validators and sanitizers.</td>
<td align="left"><a href="https://www.npmjs.com/package/validator/" rel="nofollow">https://www.npmjs.com/package/validator/</a></td>
</tr>
</tbody>
</table>

- ### 5.2 Frontend framework

<table>
<thead>
<tr>
<th align="left">Technology</th>
<th align="left">Description</th>
<th align="left">Official website</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">React</td>
<td align="left">A JavaScript library for building user interfaces</td>
<td align="left"><a href="https://reactjs.org/" rel="nofollow">https://reactjs.org/</a></td>
</tr>
<tr>
<td align="left">Redux</td>
<td align="left">React state store</td>
<td align="left"><a href="https://redux.js.org/" rel="nofollow">https://redux.js.org/</a></td>
</tr>
<tr>
<td align="left">Bootstrap</td>
<td align="left">UI library</td>
<td align="left"><a href="https://getbootstrap.com/" rel="nofollow">https://getbootstrap.com/</a></td>
</tr>
<tr>
<td align="left">axios</td>
<td align="left">Promise based HTTP client for the browser and node.js</td>
<td align="left"><a href="https://www.npmjs.com/package/axios/" rel="nofollow">https://www.npmjs.com/package/axios/</a></td>
</tr>
<tr>
<td align="left">react-router-dom</td>
<td align="left">DOM bindings for React Router.</td>
<td align="left"><a href="https://www.npmjs.com/package/react-router-dom/" rel="nofollow">https://www.npmjs.com/package/react-router-dom/</a></td>
</tr>
</tbody>
</table>

## 6. Backend and Frondend architecture diagram

- ### 6.1 Architecture Overview

![image](https://user-images.githubusercontent.com/19200456/126529714-b3e462de-bc5c-4677-9d6a-864cd15b6a39.png)

- ### 6.1 Code Overview

![](@attachment/Clipboard_2021-07-22-00-12-04.png)

## 7. Login process

![](@attachment/Clipboard_2021-07-22-00-44-54.png)

## 8. Implement Page list

<table>
<thead>
<tr>
<th align="left">Feature</th>
<th align="left">Description</th>
<th align="left">Is done</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Register</td>
<td align="left">Sign up</td>
<td align="left">done</td>
</tr>

<tr>
<td align="left">Logout</td>
<td align="left">Sign out</td>
<td align="left">done</td>
</tr>

<tr>
<td align="left">Dashboard</td>
<td align="left">Display developer base info, add or update customer experience</td>
<td align="left">done</td>
</tr>

<tr>
<td align="left">Developer</td>
<td align="left">Show all user infomation list</td>
<td align="left">done</td>
</tr>

<tr>
<td align="left">Add experience</td>
<td align="left">Add personal experience</td>
<td align="left">done</td>
</tr>

<tr>
<td align="left">Add education</td>
<td align="left">Add education experience</td>
<td align="left">done</td>
</tr>

<tr>
<td align="left">More infomation</td>
<td align="left">User detail information</td>
<td align="left">done</td>
</tr>
<tr>
<td align="left">Comment</td>
<td align="left">Comment,like or unlike developer</td>
<td align="left">done</td>
</tr>

</tbody>
</table>


## 9. System screenshot

- **Home page**

![](@attachment/Clipboard_2021-07-21-23-36-56.png)

- **Register Page**

![](@attachment/Clipboard_2021-07-21-23-38-16.png)

- **Login Page**

![](@attachment/Clipboard_2021-07-21-23-38-50.png)

- **Dashboard Page**

![](@attachment/Clipboard_2021-07-21-23-40-22.png)

- **Dashboard Page, display or operate user profile**

![](@attachment/Clipboard_2021-07-21-23-49-24.png)

- **Add personal experience**

![](@attachment/Clipboard_2021-07-21-23-50-55.png)

- **Add education experience**

![](@attachment/Clipboard_2021-07-21-23-51-29.png)

- **Show all developer information**

![](@attachment/Clipboard_2021-07-21-23-52-26.png)

- **Show all developer detail information**

![](@attachment/Clipboard_2021-07-21-23-55-16.png)

- **Comment and like**

![](@attachment/Clipboard_2021-07-21-23-58-19.png)

![image](https://user-images.githubusercontent.com/19200456/126529567-0f20d0ed-d8fb-42ff-8c17-ec8295832e9a.png)

