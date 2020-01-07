```python
#!pip install ipython-sql
#!git clone https://github.com/thomasnield/oreilly_getting_started_with_sql.git
```


```python
%load_ext sql
```


```python
%sql sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
```




    'Connected: @oreilly_getting_started_with_sql/rexon_metals.db'



# SELECT

When working with databases and SQL, the most common task is to request data from one or more tables and display it. 

The `SELECT` statement accomplishes this. 

## Retrieving Data with SQL

Let’s write our first SQL statement. The most common SQL operation is a `SELECT` statement, which pulls data from a table and then displays the results. 

Write the following statement:


```python
%sql SELECT * FROM CUSTOMER;
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>CUSTOMER_ID</th>
        <th>NAME</th>
        <th>REGION</th>
        <th>STREET_ADDRESS</th>
        <th>CITY</th>
        <th>STATE</th>
        <th>ZIP</th>
    </tr>
    <tr>
        <td>1</td>
        <td>LITE Industrial</td>
        <td>Southwest</td>
        <td>729 Ravine Way</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75014</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Rex Tooling Inc</td>
        <td>Southwest</td>
        <td>6129 Collie Blvd</td>
        <td>Dallas</td>
        <td>TX</td>
        <td>75201</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Re-Barre Construction</td>
        <td>Southwest</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Prairie Construction</td>
        <td>Southwest</td>
        <td>264 Long Rd</td>
        <td>Moore</td>
        <td>OK</td>
        <td>62104</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Marsh Lane Metal Works</td>
        <td>Southeast</td>
        <td>9143 Marsh Ln</td>
        <td>Avondale</td>
        <td>LA</td>
        <td>79782</td>
    </tr>
</table>



Let’s break down exactly what happened. A SELECT statement allows you to choose which columns to pull from a table. So the first part of the SQL shown here should be read as “Select all columns,” where * is a placeholder to specify all columns.

And you are getting these columns from the CUSTOMER table.

You do not have to pull all columns in a SELECT statement. You can also pick and choose only the columns you are interested in. The following query will only pull the CUSTOMER_ID and NAME columns:


```python
%sql SELECT CUSTOMER_ID, NAME FROM CUSTOMER;
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>CUSTOMER_ID</th>
        <th>NAME</th>
    </tr>
    <tr>
        <td>1</td>
        <td>LITE Industrial</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Rex Tooling Inc</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Re-Barre Construction</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Prairie Construction</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Marsh Lane Metal Works</td>
    </tr>
</table>



## Expression in SELECT Statements

The SELECT statement can do far more than simply select columns. You can also do calculations on one or more columns and include them in your query result. Let’s work with another table called PRODUCT.


```python
%sql SELECT * FROM PRODUCT;
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>PRODUCT_ID</th>
        <th>DESCRIPTION</th>
        <th>PRICE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Copper</td>
        <td>7.51</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Aluminum</td>
        <td>2.58</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Silver</td>
        <td>15</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Steel</td>
        <td>12.31</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Bronze</td>
        <td>4</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Duralumin</td>
        <td>7.6</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Solder</td>
        <td>14.16</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Stellite</td>
        <td>13.31</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Brass</td>
        <td>4.75</td>
    </tr>
</table>



Suppose we wanted to generate a calculated column called TAXED_PRICE that is 7% higher than PRICE. We could use a SELECT query to dynamically calculate this for us


```python
%%sql

SELECT
PRODUCT_ID,
DESCRIPTION,
PRICE,
PRICE * 1.07 AS TAXED_PRICE
FROM PRODUCT;
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>PRODUCT_ID</th>
        <th>DESCRIPTION</th>
        <th>PRICE</th>
        <th>TAXED_PRICE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Copper</td>
        <td>7.51</td>
        <td>8.0357</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Aluminum</td>
        <td>2.58</td>
        <td>2.7606</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Silver</td>
        <td>15</td>
        <td>16.05</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Steel</td>
        <td>12.31</td>
        <td>13.171700000000001</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Bronze</td>
        <td>4</td>
        <td>4.28</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Duralumin</td>
        <td>7.6</td>
        <td>8.132</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Solder</td>
        <td>14.16</td>
        <td>15.151200000000001</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Stellite</td>
        <td>13.31</td>
        <td>14.241700000000002</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Brass</td>
        <td>4.75</td>
        <td>5.0825000000000005</td>
    </tr>
</table>



Notice how the TAXED_PRICE column was dynamically calculated in the SELECT query. This column is not stored in the table, but rather calculated and displayed to us every time we run this query.

Let’s take a look at our TAXED_PRICE column and break down how it was created. We first see the PRICE is multiplied by 1.07 to calculate the taxed amount. We generate this TAXED_PRICE value for every record.

Notice too that we gave this calculated value a name using an AS statement (this is known as an alias):

We can use aliases to give names to expressions. We can also use aliases to apply a new name to an existing column within the query. For example, we can alias the PRICE column to UNTAXED_PRICE. This does not actually change the name of the column in the table, but it gives it a new name within the scope of our SELECT statement:



```python
%%sql
SELECT
PRODUCT_ID,
DESCRIPTION, 
PRICE AS UNTAXED_PRICE,
PRICE * 1.07 AS TAXED_PRICE
FROM PRODUCT
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>PRODUCT_ID</th>
        <th>DESCRIPTION</th>
        <th>UNTAXED_PRICE</th>
        <th>TAXED_PRICE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Copper</td>
        <td>7.51</td>
        <td>8.0357</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Aluminum</td>
        <td>2.58</td>
        <td>2.7606</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Silver</td>
        <td>15</td>
        <td>16.05</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Steel</td>
        <td>12.31</td>
        <td>13.171700000000001</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Bronze</td>
        <td>4</td>
        <td>4.28</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Duralumin</td>
        <td>7.6</td>
        <td>8.132</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Solder</td>
        <td>14.16</td>
        <td>15.151200000000001</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Stellite</td>
        <td>13.31</td>
        <td>14.241700000000002</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Brass</td>
        <td>4.75</td>
        <td>5.0825000000000005</td>
    </tr>
</table>



To round the TAXED_PRICE to two decimal places, we can pass the multiplication expression PRICE * 1.07 as the first argument, and a 2 as the second:


```python
%%sql
SELECT
PRODUCT_ID,
DESCRIPTION, 
PRICE AS UNTAXED_PRICE,
round(PRICE * 1.07,2) AS TAXED_PRICE
FROM PRODUCT
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>PRODUCT_ID</th>
        <th>DESCRIPTION</th>
        <th>UNTAXED_PRICE</th>
        <th>TAXED_PRICE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Copper</td>
        <td>7.51</td>
        <td>8.04</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Aluminum</td>
        <td>2.58</td>
        <td>2.76</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Silver</td>
        <td>15</td>
        <td>16.05</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Steel</td>
        <td>12.31</td>
        <td>13.17</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Bronze</td>
        <td>4</td>
        <td>4.28</td>
    </tr>
    <tr>
        <td>6</td>
        <td>Duralumin</td>
        <td>7.6</td>
        <td>8.13</td>
    </tr>
    <tr>
        <td>7</td>
        <td>Solder</td>
        <td>14.16</td>
        <td>15.15</td>
    </tr>
    <tr>
        <td>8</td>
        <td>Stellite</td>
        <td>13.31</td>
        <td>14.24</td>
    </tr>
    <tr>
        <td>9</td>
        <td>Brass</td>
        <td>4.75</td>
        <td>5.08</td>
    </tr>
</table>



Here are the mathematical operators you can use in SQL:

| Operator 	| Description                                   	| Example              	|
|----------	|-----------------------------------------------	|----------------------	|
| +        	| Adds two numbers                              	| STOCK + NEW_SHIPMENT 	|
| -        	| Subtracts two numbers                         	| STOCK - DEFECTS      	|
| *        	| Multiplies two numbers                        	| PRICE * 1.07         	|
| /        	| Divides two numbers                           	| STOCK / PALLET_SIZE  	|
| %        	| Divides two, numbers but return the remainder 	| STOCK % PALLET_SIZE  	|

## Text Concatenation

The concatenate operator is specified by a double pipe (||), and you put the data values to concatenate on both sides of it.


```python
%%sql
SELECT NAME,
CITY || ', ' || STATE AS LOCATION
FROM CUSTOMER;
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>NAME</th>
        <th>LOCATION</th>
    </tr>
    <tr>
        <td>LITE Industrial</td>
        <td>Irving, TX</td>
    </tr>
    <tr>
        <td>Rex Tooling Inc</td>
        <td>Dallas, TX</td>
    </tr>
    <tr>
        <td>Re-Barre Construction</td>
        <td>Irving, TX</td>
    </tr>
    <tr>
        <td>Prairie Construction</td>
        <td>Moore, OK</td>
    </tr>
    <tr>
        <td>Marsh Lane Metal Works</td>
        <td>Avondale, LA</td>
    </tr>
</table>




```python
%%sql
SELECT NAME,
STREET_ADDRESS || ' ' || CITY || ', ' || STATE || ' ' || ZIP AS SHIP_ADDRESS
FROM CUSTOMER;
```

     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
    Done.





<table>
    <tr>
        <th>NAME</th>
        <th>SHIP_ADDRESS</th>
    </tr>
    <tr>
        <td>LITE Industrial</td>
        <td>729 Ravine Way Irving, TX 75014</td>
    </tr>
    <tr>
        <td>Rex Tooling Inc</td>
        <td>6129 Collie Blvd Dallas, TX 75201</td>
    </tr>
    <tr>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr Irving, TX 75032</td>
    </tr>
    <tr>
        <td>Prairie Construction</td>
        <td>264 Long Rd Moore, OK 62104</td>
    </tr>
    <tr>
        <td>Marsh Lane Metal Works</td>
        <td>9143 Marsh Ln Avondale, LA 79782</td>
    </tr>
</table>



## Summary
In this section, we covered how to use the SELECT statement, the most common SQL operation. It retrieves and transforms data from a table without affecting the table itself. We also learned how to select columns and write expressions.

Within expressions, we can use operators and functions to do tasks such as rounding, math, and concatenation. 
