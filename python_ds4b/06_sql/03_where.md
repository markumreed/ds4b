```python
#!pip install ipython-sql
!git clone https://github.com/thomasnield/oreilly_getting_started_with_sql.git
```

    Cloning into 'oreilly_getting_started_with_sql'...
    remote: Enumerating objects: 3, done.[K
    remote: Counting objects: 100% (3/3), done.[K
    remote: Compressing objects: 100% (3/3), done.[K
    remote: Total 60 (delta 0), reused 0 (delta 0), pack-reused 57
    Unpacking objects: 100% (60/60), done.



```python
%load_ext sql
```

    The sql extension is already loaded. To reload it, use:
      %reload_ext sql



```python
%sql sqlite:///oreilly_getting_started_with_sql/weather_stations.db
```




    'Connected: @oreilly_getting_started_with_sql/weather_stations.db'



# WHERE

Over the next few weeks, we will be adding more functionalities to the SELECT statement. A very common task when working with data is filtering for records based on criteria, which can be done with a WHERE statement. 

We will be learning more functions and using them in the WHERE clause, but we can also use them in SELECT statements, as discussed in the previous chapter. For the most part, expressions and functions can be used in any part of a SQL statement.

## Filtering Records



```python
%%sql
SELECT * FROM station_data;
```


```python
%%sql
SELECT * FROM station_data
WHERE year = 2010;
```

Conversely, you can use != or <> to get everything but 2010.


```python
%%sql
SELECT * FROM station_data
WHERE year != 2010;
```

We can also qualify inclusive ranges using a BETWEEN statement:


```python
%%sql
SELECT * FROM station_data
WHERE year BETWEEN 2005 AND 2010;
```

## AND, OR, and IN Statements

A BETWEEN can alternatively be expressed using greater than or equal to and less than or equal to expressions and an AND statement.



```python
%%sql
SELECT * FROM station_data 
WHERE year >= 2005 AND year <= 2010;
```

If we wanted everything between 2005 and 2010 exclusively — i.e., not including those two years — we would just get rid of the = characters. Only 2006, 2007, 2008, and 2009 would then qualify:


```python
%%sql
SELECT * FROM station_data
WHERE year > 2005 AND year < 2010;
```

We also have the option of using OR. In an OR statement, at least one of the criteria must be true for the record to qualify. If we wanted only records with months 3, 6, 9, or 12, we could use an OR to accomplish that:


```python
%%sql

SELECT * FROM station_data 
WHERE MONTH = 3 
OR MONTH = 6 
OR MONTH = 9 
OR MONTH = 12;

```

A more effient way is to use the IN statement.


```python
%%sql
SELECT * FROM station_data
WHERE MONTH IN (3,6,9,12);
```

If we want everything except 3,6,9,12, we use the NOT IN:


```python
%%sql
SELECT * FROM station_data
WHERE MONTH NOT IN (3,6,9,12);
```



We could also leverage some logic:


```python
%%sql
SELECT * FROM station_data
WHERE MONTH % 3 = 0;
```

## Using Where on Text

The rules for qualifying text fields follow the same structure, although there are subtle differences. You can use =, AND, OR, and IN statements with text. However, when using text, you must wrap literals (or text values you specify) in single quotes. For example, if you wanted to filter for a specific report_code, you could run this query:


```python
%%sql
SELECT * FROM station_data
WHERE report_code = '513A63';
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>station_number</th>
        <th>report_code</th>
        <th>year</th>
        <th>month</th>
        <th>day</th>
        <th>dew_point</th>
        <th>station_pressure</th>
        <th>visibility</th>
        <th>wind_speed</th>
        <th>temperature</th>
        <th>precipitation</th>
        <th>snow_depth</th>
        <th>fog</th>
        <th>rain</th>
        <th>hail</th>
        <th>thunder</th>
        <th>tornado</th>
    </tr>
    <tr>
        <td>702223</td>
        <td>513A63</td>
        <td>2010</td>
        <td>1</td>
        <td>22</td>
        <td>-23.1</td>
        <td>None</td>
        <td>10</td>
        <td>0.8</td>
        <td>-15.6</td>
        <td>0</td>
        <td>None</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
</table>



This single-quote rule applies to all text operations, including this IN operation: 


```python
%%sql
SELECT * FROM station_data 
WHERE report_code IN ('513A63','1F8A7B','EF616A');
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>station_number</th>
        <th>report_code</th>
        <th>year</th>
        <th>month</th>
        <th>day</th>
        <th>dew_point</th>
        <th>station_pressure</th>
        <th>visibility</th>
        <th>wind_speed</th>
        <th>temperature</th>
        <th>precipitation</th>
        <th>snow_depth</th>
        <th>fog</th>
        <th>rain</th>
        <th>hail</th>
        <th>thunder</th>
        <th>tornado</th>
    </tr>
    <tr>
        <td>470160</td>
        <td>EF616A</td>
        <td>1967</td>
        <td>7</td>
        <td>29</td>
        <td>65.6</td>
        <td>None</td>
        <td>9.2</td>
        <td>1.2</td>
        <td>72.4</td>
        <td>0.04</td>
        <td>None</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>821930</td>
        <td>1F8A7B</td>
        <td>1953</td>
        <td>6</td>
        <td>18</td>
        <td>72.8</td>
        <td>1007.1</td>
        <td>12.4</td>
        <td>3.6</td>
        <td>81.3</td>
        <td>0</td>
        <td>None</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
    <tr>
        <td>702223</td>
        <td>513A63</td>
        <td>2010</td>
        <td>1</td>
        <td>22</td>
        <td>-23.1</td>
        <td>None</td>
        <td>10</td>
        <td>0.8</td>
        <td>-15.6</td>
        <td>0</td>
        <td>None</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
</table>



The length function will count the number of characters for a given value:


```python
%%sql
SELECT * FROM station_data
WHERE length(report_code) != 6;
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>station_number</th>
        <th>report_code</th>
        <th>year</th>
        <th>month</th>
        <th>day</th>
        <th>dew_point</th>
        <th>station_pressure</th>
        <th>visibility</th>
        <th>wind_speed</th>
        <th>temperature</th>
        <th>precipitation</th>
        <th>snow_depth</th>
        <th>fog</th>
        <th>rain</th>
        <th>hail</th>
        <th>thunder</th>
        <th>tornado</th>
    </tr>
</table>



Another common operation is to use wildcards with a LIKE expression, where % is any number of characters and _ is any single character. Any other character is interpreted literally. So, if you wanted to find all report codes that start with the letter “A,” you would run this statement to find “A” followed by any characters:


```python
%%sql

SELECT * FROM station_data
WHERE report_code LIKE 'A%';
```

If you wanted to find all report codes that have a “B” as the first character and a “C” as the third character, you would specify an underscore (_) for the second position, and follow with any number of characters after the “C”:


```python
%%sql
SELECT * FROM station_data
WHERE report_code LIKE 'B_C%'
```

## WHERE on Booleans


```python
%%sql

SELECT * FROM station_data
WHERE tornado = 1 AND hail = 1;
```

SQLite only supports using 1 for true and 0 for false.


```python
%%sql
SELECT * FRPM station_data
WHERE tornado =0 AND hail = 1;
```

## Handling NULL

Some columns such as `station_pressure` and `snow_depth`, have *null* values. A null is a value that has no value. It is the complete absence of any content.


```python
%%sql

SELECT * FROM station_data
WHERE snow_depth IS NULL;
```

Nulls can be hard to handle when composing WHERE statements. I fyou wanted to query all records where `precipitation is less than 0.5, you could write:


```python
%%sql

SELECT * FROM station_data
WHERE precipitation <= 0.5;
```

But you must consider the null values. If you wanted the nulls to be included you need to use an OR statment.


```python
%%sql

SELECT * FROM station_data
WHERE precipitation IS NULL OR precipitation <= 0.5;
```

A more elegant way is to use `coalesce()`. If you wanted nulls to be treated as 0 within our condition, we could `coalesce()` the precipitation field to convert null to 0:


```python
%%sql

SELECT * FROM station_data
WHERE coalesce(precipitation, 0) <= 0.5;
```

## Grouping Conditions

When chaining AND and OR together, it is good to group them. 

Make sure that you organize each set of conditions between each OR in a way that groups related conditions. 


```python
%%sql

SELECT * FROM station_data
WHERE rain = 1 AND temperature <=32
OR snow_depth>0;
```

While this technically works, there is a degree of ambiguity.


```python
%%sql

SELECT * FROM station_data
WHERE (rain=1 AND temperature <=32)
OR snow_depth >0;
```

Here we group the expression within paretheses so it is calculated as a single unit, and temperature is not mixed up with the OR operator and accidentally mangled with the snow_depth.


```python

```
