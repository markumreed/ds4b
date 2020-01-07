### PREAMBLE


```
#!pip install ipython-sql
!git clone https://github.com/thomasnield/oreilly_getting_started_with_sql.git
%load_ext sql
%sql sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
```

    fatal: destination path 'oreilly_getting_started_with_sql' already exists and is not an empty directory.
    The sql extension is already loaded. To reload it, use:
      %reload_ext sql





    'Connected: @oreilly_getting_started_with_sql/rexon_metals.db'



# JOIN
## Stitching Tables Together

Joining is the defining functionality of SQL an dsets it apart from other data technologies. 

Remember:

Normalized databases have tables with fields that point to other tables. Sonciser the CUSTOMER_ORDER table, which has a CUSTOMER_ID field.
 




```
%%sql
SELECT * FROM customer
LIMIT 10;
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
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



This CUSTOMER_ID field gives us a *key* to loop up in the table CUSTOMER. Knowing this, it should be no surprise that the CUSTOMER table also has a CUSTOMER_ID field. 

We can retrieve customerif information from an order from this table.


```
%%sql
SELECT * FROM customer_order
LIMIT 10;
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>ORDER_ID</th>
        <th>ORDER_DATE</th>
        <th>SHIP_DATE</th>
        <th>CUSTOMER_ID</th>
        <th>PRODUCT_ID</th>
        <th>ORDER_QTY</th>
        <th>SHIPPED</th>
    </tr>
    <tr>
        <td>1</td>
        <td>2015-05-15</td>
        <td>2015-05-18</td>
        <td>1</td>
        <td>1</td>
        <td>450</td>
        <td>false</td>
    </tr>
    <tr>
        <td>2</td>
        <td>2015-05-18</td>
        <td>2015-05-21</td>
        <td>3</td>
        <td>2</td>
        <td>600</td>
        <td>false</td>
    </tr>
    <tr>
        <td>3</td>
        <td>2015-05-20</td>
        <td>2015-05-23</td>
        <td>3</td>
        <td>5</td>
        <td>300</td>
        <td>false</td>
    </tr>
    <tr>
        <td>4</td>
        <td>2015-05-18</td>
        <td>2015-05-22</td>
        <td>5</td>
        <td>4</td>
        <td>375</td>
        <td>false</td>
    </tr>
    <tr>
        <td>5</td>
        <td>2015-05-17</td>
        <td>2015-05-20</td>
        <td>3</td>
        <td>2</td>
        <td>500</td>
        <td>false</td>
    </tr>
</table>



The other aspect to consider in a relationship is how many records in the child can be tited to a single record of the parent. Toake the CUSTOMER and CUSTOMER_ORDER tables and we see a *one-to-many relationship*, where a single customer record can line up with multiple orders. 

One-to-many is the most common type of relationship since it acconodates most business needs. 

## INNER JOIN

Understanding table relationships, we can consider that it might be nice to stich two tables together, so we can see CUSTOMER and CUSTOMER_ORDER information side by side. We can avoid using many lookups by using the JOIN operations.

The INNER JOIN allows us to merge two tables together. But if we are going to merge tables, we need to define a commonality between the two so records between the two line up. 



```
%%sql

SELECT ORDER_ID, 
CUSTOMER.CUSTOMER_ID, 
ORDER_DATE, 
SHIP_DATE, 
NAME, 
STREET_ADDRESS, 
CITY, 
STATE, 
ZIP, PRODUCT_ID, ORDER_QTY

FROM CUSTOMER INNER JOIN CUSTOMER_ORDER
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID;
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>ORDER_ID</th>
        <th>CUSTOMER_ID</th>
        <th>ORDER_DATE</th>
        <th>SHIP_DATE</th>
        <th>NAME</th>
        <th>STREET_ADDRESS</th>
        <th>CITY</th>
        <th>STATE</th>
        <th>ZIP</th>
        <th>PRODUCT_ID</th>
        <th>ORDER_QTY</th>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>2015-05-15</td>
        <td>2015-05-18</td>
        <td>LITE Industrial</td>
        <td>729 Ravine Way</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75014</td>
        <td>1</td>
        <td>450</td>
    </tr>
    <tr>
        <td>2</td>
        <td>3</td>
        <td>2015-05-18</td>
        <td>2015-05-21</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2</td>
        <td>600</td>
    </tr>
    <tr>
        <td>3</td>
        <td>3</td>
        <td>2015-05-20</td>
        <td>2015-05-23</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>5</td>
        <td>300</td>
    </tr>
    <tr>
        <td>4</td>
        <td>5</td>
        <td>2015-05-18</td>
        <td>2015-05-22</td>
        <td>Marsh Lane Metal Works</td>
        <td>9143 Marsh Ln</td>
        <td>Avondale</td>
        <td>LA</td>
        <td>79782</td>
        <td>4</td>
        <td>375</td>
    </tr>
    <tr>
        <td>5</td>
        <td>3</td>
        <td>2015-05-17</td>
        <td>2015-05-20</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2</td>
        <td>500</td>
    </tr>
</table>



1. Select the fields we want from the CUSTOMER and CUSTOMER_ORDER tables.

1. The important part that temorarily merges two tables into one.

## LEFT JOIN

Two customers were excluded from the INNER JOIN on CUSTOMER_ID since they didn't have any orders to join on. But suppose we wanted them included anyways. 

Modify the previous query to utilize the LEFT JOIN:


```
%%sql

SELECT ORDER_ID, 
CUSTOMER.CUSTOMER_ID, 
ORDER_DATE, 
SHIP_DATE, 
NAME, 
STREET_ADDRESS, 
CITY, 
STATE, 
ZIP, PRODUCT_ID, ORDER_QTY

FROM CUSTOMER LEFT JOIN CUSTOMER_ORDER
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID;
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>ORDER_ID</th>
        <th>CUSTOMER_ID</th>
        <th>ORDER_DATE</th>
        <th>SHIP_DATE</th>
        <th>NAME</th>
        <th>STREET_ADDRESS</th>
        <th>CITY</th>
        <th>STATE</th>
        <th>ZIP</th>
        <th>PRODUCT_ID</th>
        <th>ORDER_QTY</th>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>2015-05-15</td>
        <td>2015-05-18</td>
        <td>LITE Industrial</td>
        <td>729 Ravine Way</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75014</td>
        <td>1</td>
        <td>450</td>
    </tr>
    <tr>
        <td>None</td>
        <td>2</td>
        <td>None</td>
        <td>None</td>
        <td>Rex Tooling Inc</td>
        <td>6129 Collie Blvd</td>
        <td>Dallas</td>
        <td>TX</td>
        <td>75201</td>
        <td>None</td>
        <td>None</td>
    </tr>
    <tr>
        <td>5</td>
        <td>3</td>
        <td>2015-05-17</td>
        <td>2015-05-20</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2</td>
        <td>500</td>
    </tr>
    <tr>
        <td>2</td>
        <td>3</td>
        <td>2015-05-18</td>
        <td>2015-05-21</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2</td>
        <td>600</td>
    </tr>
    <tr>
        <td>3</td>
        <td>3</td>
        <td>2015-05-20</td>
        <td>2015-05-23</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>5</td>
        <td>300</td>
    </tr>
    <tr>
        <td>None</td>
        <td>4</td>
        <td>None</td>
        <td>None</td>
        <td>Prairie Construction</td>
        <td>264 Long Rd</td>
        <td>Moore</td>
        <td>OK</td>
        <td>62104</td>
        <td>None</td>
        <td>None</td>
    </tr>
    <tr>
        <td>4</td>
        <td>5</td>
        <td>2015-05-18</td>
        <td>2015-05-22</td>
        <td>Marsh Lane Metal Works</td>
        <td>9143 Marsh Ln</td>
        <td>Avondale</td>
        <td>LA</td>
        <td>79782</td>
        <td>4</td>
        <td>375</td>
    </tr>
</table>



The table specifiedon the "left" side of the LEFT JOIN operator will have all its records included, even if they do not have any child records in the "right" table. Notice we have two additional records for the customers that have no orders.

It is common to use LEFT JOIN to find "orphaned" child records. 


```
%%sql

SELECT 
CUSTOMER.CUSTOMER_ID,
NAME as CUSTOMER_NAME
FROM CUSTOMER LEFT JOIN CUSTOMER_ORDER
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID
WHERE ORDER_ID IS NULL;
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>CUSTOMER_ID</th>
        <th>CUSTOMER_NAME</th>
    </tr>
    <tr>
        <td>2</td>
        <td>Rex Tooling Inc</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Prairie Construction</td>
    </tr>
</table>



## Joining Mutliple Tables

Relationsal databses can be complex in terms of relationships between tables.

For example, we can supply not only CUSTOMER information to the CUSTOMER_ORDER table, but also PRODUCT information using PRODUCT_ID.

We can use these relationships to execute a query that displays orders with customer information and product information simultaneously. All we do is define the two joins.


```
%%sql

SELECT
ORDER_ID,
CUSTOMER.CUSTOMER_ID,
NAME as CUSTOMER_NAME,
STREET_ADDRESS,
CITY,
STATE,
ZIP,
ORDER_DATE,
PRODUCT.PRODUCT_ID,
DESCRIPTION,
ORDER_QTY,
ORDER_QTY * PRICE as REVENUE

FROM CUSTOMER
INNER JOIN CUSTOMER_ORDER 
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID

INNER JOIN PRODUCT
ON CUSTOMER_ORDER.PRODUCT_ID = PRODUCT.PRODUCT_ID
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>ORDER_ID</th>
        <th>CUSTOMER_ID</th>
        <th>CUSTOMER_NAME</th>
        <th>STREET_ADDRESS</th>
        <th>CITY</th>
        <th>STATE</th>
        <th>ZIP</th>
        <th>ORDER_DATE</th>
        <th>PRODUCT_ID</th>
        <th>DESCRIPTION</th>
        <th>ORDER_QTY</th>
        <th>REVENUE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>LITE Industrial</td>
        <td>729 Ravine Way</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75014</td>
        <td>2015-05-15</td>
        <td>1</td>
        <td>Copper</td>
        <td>450</td>
        <td>3379.5</td>
    </tr>
    <tr>
        <td>2</td>
        <td>3</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2015-05-18</td>
        <td>2</td>
        <td>Aluminum</td>
        <td>600</td>
        <td>1548.0</td>
    </tr>
    <tr>
        <td>3</td>
        <td>3</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2015-05-20</td>
        <td>5</td>
        <td>Bronze</td>
        <td>300</td>
        <td>1200</td>
    </tr>
    <tr>
        <td>4</td>
        <td>5</td>
        <td>Marsh Lane Metal Works</td>
        <td>9143 Marsh Ln</td>
        <td>Avondale</td>
        <td>LA</td>
        <td>79782</td>
        <td>2015-05-18</td>
        <td>4</td>
        <td>Steel</td>
        <td>375</td>
        <td>4616.25</td>
    </tr>
    <tr>
        <td>5</td>
        <td>3</td>
        <td>Re-Barre Construction</td>
        <td>9043 Windy Dr</td>
        <td>Irving</td>
        <td>TX</td>
        <td>75032</td>
        <td>2015-05-17</td>
        <td>2</td>
        <td>Aluminum</td>
        <td>500</td>
        <td>1290.0</td>
    </tr>
</table>



## Grouping JOINs

We have orders with their revenue, thatnks to the join we built. But suppose we want to find the total_revenue by customer? We still need to use all three tables and merge them together with out current join setup, since we need the revenue we just calculated. But also we need to do a GROUP BY:


```
%%sql

SELECT CUSTOMER.CUSTOMER_ID,
NAME as CUSTOMER_NAME,
sum(ORDER_QTY * PRICE) as TOTAL_REVENUE

FROM CUSTOMER_ORDER

INNER JOIN CUSTOMER
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID 

INNER JOIN PRODUCT
ON CUSTOMER_ORDER.PRODUCT_ID = PRODUCT.PRODUCT_ID

GROUP BY 1, 2
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>CUSTOMER_ID</th>
        <th>CUSTOMER_NAME</th>
        <th>TOTAL_REVENUE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>LITE Industrial</td>
        <td>3379.5</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Re-Barre Construction</td>
        <td>4038.0</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Marsh Lane Metal Works</td>
        <td>4616.25</td>
    </tr>
</table>



Since we want all customers we can use LEFT JOIN in place of INNER JOIN


```
%%sql

SELECT CUSTOMER.CUSTOMER_ID,
NAME as CUSTOMER_NAME,
coalesce(sum(ORDER_QTY * PRICE),0) as TOTAL_REVENUE

FROM CUSTOMER_ORDER

LEFT JOIN CUSTOMER
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID 

LEFT JOIN PRODUCT
ON CUSTOMER_ORDER.PRODUCT_ID = PRODUCT.PRODUCT_ID

GROUP BY 1, 2
```

       sqlite:///oreilly_getting_started_with_sql/rexon.db
     * sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
       sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>CUSTOMER_ID</th>
        <th>CUSTOMER_NAME</th>
        <th>TOTAL_REVENUE</th>
    </tr>
    <tr>
        <td>1</td>
        <td>LITE Industrial</td>
        <td>3379.5</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Re-Barre Construction</td>
        <td>4038.0</td>
    </tr>
    <tr>
        <td>5</td>
        <td>Marsh Lane Metal Works</td>
        <td>4616.25</td>
    </tr>
</table>




```

```
