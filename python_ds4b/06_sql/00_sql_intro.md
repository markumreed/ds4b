# Why Learn SQL?



# What Is SQL and Why Is It Marketable?

- It is an obvious statement that the business landscape is shifting rapidly.
- Companies are investing vast amounts of capital to gather and warehouse data.
- SQL, which stands for Structured Query Language, comes in. It provides a means to access and manipulate this data in meaningful ways and provide business insights not possible before.



# What Is SQL and Why Is It Marketable?

- Businesses are gathering data at exponential rates, and there is an equally growing need for people who know how to analyze and manage it.
- In recent years, data has suddenly become ubiquitous — yet few people know how to access it meaningfully, which has put SQL talent in high demand.



# Databases



# What Is a Database?

- A database is anything that collects and organizes data.
  - A spreadsheet holding customer bookings is a database
  - A plain-text file containing flight schedule data
- Professionally we are referring to a relational database management system (RDBMS).
  - RDBMS is simply a type of database that holds one or more tables that may have relationships to each other.



# Exploring Relational Databases

A table should be a familiar concept. It has columns and rows to store data, much like a spreadsheet. These tables can have relationships to each other, such as an `ORDER` table that refers to a `CUSTOMER` table for customer information.



# Exploring Relational Databases

Suppose we have an ORDER table with a field called CUSTOMER_ID


| ORDER_ID | ORDER_DATE | SHIP_DATE  | CUSTOMER_ID | PRODUCT_ID | ORDER_QTY | SHIPPED |
|----------|------------|------------|-------------|------------|-----------|---------|
| 3        | 2018-04-20 | 2018-04-23 | 3           | 3          | 300       | false   |
| 4        | 2018-04-18 | 2018-04-22 | 5           | 5          | 375       | false   |
| 1        | 2018-04-15 | 2018-04-18 | 1           | 1          | 450       | false   |
| 5        | 2018-04-17 | 2018-04-20 | 3           | 3          | 500       | false   |
| 2        | 2018-04-18 | 2018-04-21 | 3           | 3          | 600       | false   |



# Exploring Relational Databases

We can reasonably expect another table called CUSTOMER, which holds customer information

| CUSTOMER_ID | NAME                  | REGION    | STREET_ADDRESS  | CITY     | STATE | ZIP   |
|-------------|-----------------------|-----------|-----------------|----------|-------|-------|
| 1           | LITE Industrial       | Southwest | 123 Ravine Way  | Irving   | TX    | 75014 |
| 2           | REX Tooling Inc       | Southwest | 456 Collie Blvd | Dallas   | TX    | 75201 |
| 3           | Re-Barre Construction | Southwest | 789 Windy Dr    | Irving   | TX    | 75032 |
| 4           | Prairie Construction  | Southwest | 890 Long Rd     | Moore    | OK    | 62104 |
| 5           | Marsh Lane Metals     | Southeast | 345 Marsh Ln    | Avondale | LA    | 79782 |



# Exploring Relational Databases

When we go through the `ORDER` table, we can use the `CUSTOMER_ID` to look up the customer information in the `CUSTOMER` table. This is the fundamental idea behind a “relational database,” where tables may have fields that point to information in other tables.



# Why Separate Tables?

The motivation is _normalization_, which is separating the different types of data into their own tables rather than putting them in one table. If we had all information in a single table, it would be redundant, bloated, and very difficult to maintain.


# SQLite
# What is SQLite?

SQLite is the most widely distributed database in the world. It is put on iPhones, iPads, Android devices, Windows phones, thermostats, car consoles, satellites, and many other modern devices that need to store and retrieve data easily.

It excels where simplicity and low overhead is needed. It is also great for prototyping business databases.



# What is SQLite?

But every technology has a trade-off. Because it has no server managing access to it, it fails in multiuser environments where multiple people can simultaneously edit the SQLite file. Still, for our training purposes, SQLite is perfect.


