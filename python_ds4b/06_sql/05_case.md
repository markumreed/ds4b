# CASE Statements

A CASE statement allows us to map one or more conditions to a corresponding value for each condition. You start a CASE statement with the word CASE and conclude it with an END. Between those keywords, you specify each condition with the a WHEN [condition] THEN [value].

After specifying the condition-value pairs, you can have a catch-all value to default to if none of the conditions where met, which is specified in the ELSE.


```
#!pip install ipython-sql
!git clone https://github.com/thomasnield/oreilly_getting_started_with_sql.git
%load_ext sql
%sql sqlite:///oreilly_getting_started_with_sql/weather_stations.db
```

    Cloning into 'oreilly_getting_started_with_sql'...
    remote: Enumerating objects: 3, done.[K
    remote: Counting objects: 100% (3/3), done.[K
    remote: Compressing objects: 100% (3/3), done.[K
    remote: Total 60 (delta 0), reused 0 (delta 0), pack-reused 57[K
    Unpacking objects: 100% (60/60), done.





    'Connected: @oreilly_getting_started_with_sql/weather_stations.db'




```
%%sql

SELECT report_code, year, month, day, wind_speed,

CASE
  WHEN wind_speed >= 40 THEN 'HIGH'
  WHEN wind_speed >= 30 AND wind_speed < 40 THEN 'MODERATE'
  ELSE 'LOW'
END as wind_severity
FROM station_data
LIMIT 10;
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>report_code</th>
        <th>year</th>
        <th>month</th>
        <th>day</th>
        <th>wind_speed</th>
        <th>wind_severity</th>
    </tr>
    <tr>
        <td>34DDA7</td>
        <td>2002</td>
        <td>12</td>
        <td>21</td>
        <td>0.2</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>39537B</td>
        <td>1998</td>
        <td>10</td>
        <td>1</td>
        <td>6.7</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>C3C6D5</td>
        <td>2001</td>
        <td>5</td>
        <td>18</td>
        <td>4.3</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>145150</td>
        <td>2007</td>
        <td>10</td>
        <td>14</td>
        <td>2.5</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>EF616A</td>
        <td>1967</td>
        <td>7</td>
        <td>29</td>
        <td>1.2</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>1F8A7B</td>
        <td>1953</td>
        <td>6</td>
        <td>18</td>
        <td>3.6</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>D028D8</td>
        <td>1981</td>
        <td>6</td>
        <td>27</td>
        <td>3</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>C74611</td>
        <td>1978</td>
        <td>2</td>
        <td>5</td>
        <td>13.3</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>737090</td>
        <td>1962</td>
        <td>8</td>
        <td>14</td>
        <td>5.1</td>
        <td>LOW</td>
    </tr>
    <tr>
        <td>C5C66E</td>
        <td>2006</td>
        <td>10</td>
        <td>15</td>
        <td>1.7</td>
        <td>LOW</td>
    </tr>
</table>



## Grouping CASE Statements

When you create CAST statements and group them, you can create some very powerful transformations. Converting values based on one or more conditions before aggregating them gives us even more possibilities to slice data in interesting ways. 


```
%%sql

SELECT year,

CASE
  WHEN wind_speed >= 40 THEN 'HIGHT'
  WHEN wind_speed >= 40 THEN 'MODERATE'
  ELSE 'LOW'
END as wind_seversity,

COUNT(*) as record_count

FROM station_data
GROUP BY 1, 2

LIMIT 10;
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>year</th>
        <th>wind_seversity</th>
        <th>record_count</th>
    </tr>
    <tr>
        <td>1930</td>
        <td>LOW</td>
        <td>5</td>
    </tr>
    <tr>
        <td>1932</td>
        <td>LOW</td>
        <td>3</td>
    </tr>
    <tr>
        <td>1933</td>
        <td>LOW</td>
        <td>6</td>
    </tr>
    <tr>
        <td>1935</td>
        <td>LOW</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1936</td>
        <td>LOW</td>
        <td>18</td>
    </tr>
    <tr>
        <td>1937</td>
        <td>LOW</td>
        <td>23</td>
    </tr>
    <tr>
        <td>1938</td>
        <td>LOW</td>
        <td>13</td>
    </tr>
    <tr>
        <td>1939</td>
        <td>LOW</td>
        <td>9</td>
    </tr>
    <tr>
        <td>1940</td>
        <td>LOW</td>
        <td>26</td>
    </tr>
    <tr>
        <td>1941</td>
        <td>LOW</td>
        <td>42</td>
    </tr>
</table>



## The "Zero/Null" CASE Trick

You can use tricks with the CASE statement. One simeple but useful pattern is the "zero/null" CASE trick. This allows you to apply different filters for different aggregate values, all in a single SELECT query.


```
%%sql

SELECT year, month,

round(SUM(CASE WHEN tornado = 1 THEN precipitation ELSE 0 END),2) as tornado_precipitation,

round(SUM(CASE WHEN tornado = 0 THEN precipitation ELSE 0 END),2) as non_tornado_precipitation

FROM station_data
GROUP BY year, month
LIMIT 10;
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>year</th>
        <th>month</th>
        <th>tornado_precipitation</th>
        <th>non_tornado_precipitation</th>
    </tr>
    <tr>
        <td>1930</td>
        <td>6</td>
        <td>0.0</td>
        <td>0.0</td>
    </tr>
    <tr>
        <td>1930</td>
        <td>10</td>
        <td>0.0</td>
        <td>None</td>
    </tr>
    <tr>
        <td>1932</td>
        <td>3</td>
        <td>0.0</td>
        <td>0.0</td>
    </tr>
    <tr>
        <td>1933</td>
        <td>3</td>
        <td>0.0</td>
        <td>0.0</td>
    </tr>
    <tr>
        <td>1933</td>
        <td>7</td>
        <td>0.0</td>
        <td>None</td>
    </tr>
    <tr>
        <td>1935</td>
        <td>7</td>
        <td>0.0</td>
        <td>0.0</td>
    </tr>
    <tr>
        <td>1936</td>
        <td>8</td>
        <td>0.0</td>
        <td>0.64</td>
    </tr>
    <tr>
        <td>1936</td>
        <td>9</td>
        <td>0.0</td>
        <td>0.0</td>
    </tr>
    <tr>
        <td>1936</td>
        <td>10</td>
        <td>0.0</td>
        <td>0.27</td>
    </tr>
    <tr>
        <td>1936</td>
        <td>11</td>
        <td>0.0</td>
        <td>0.06</td>
    </tr>
</table>



The CASE statement can do an impressive amount of work, especially in complex aggregation task. By leverageing a condition to make a value 0 if the condition is not met, we effectively ignore that value and exclude it from the SUM (since adding 0 has no impact).

You could so a similar calculation with MIN or MAX operations, and us a null instead of 0 to make sure values with certain coinditon are never considered:


```
%%sql
SELECT year,

MAX(CASE WHEN tornado = 0 THEN precipitation ELSE NULL END) as max_non_tornado_precipitation,

MAX(CASE WHEN tornado = 1 THEN precipitation ELSE NULL END) as max_tornado_precipitation
FROM station_data
WHERE year >= 1990
GROUP BY year
LIMIT 10;
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>year</th>
        <th>max_non_tornado_precipitation</th>
        <th>max_tornado_precipitation</th>
    </tr>
    <tr>
        <td>1990</td>
        <td>2.48</td>
        <td>0.59</td>
    </tr>
    <tr>
        <td>1991</td>
        <td>2.36</td>
        <td>1.93</td>
    </tr>
    <tr>
        <td>1992</td>
        <td>1.5</td>
        <td>1.51</td>
    </tr>
    <tr>
        <td>1993</td>
        <td>1.18</td>
        <td>2.13</td>
    </tr>
    <tr>
        <td>1994</td>
        <td>1.26</td>
        <td>1.16</td>
    </tr>
    <tr>
        <td>1995</td>
        <td>0.91</td>
        <td>0.35</td>
    </tr>
    <tr>
        <td>1996</td>
        <td>3.31</td>
        <td>0.68</td>
    </tr>
    <tr>
        <td>1997</td>
        <td>1.18</td>
        <td>0.08</td>
    </tr>
    <tr>
        <td>1998</td>
        <td>1.22</td>
        <td>0.2</td>
    </tr>
    <tr>
        <td>1999</td>
        <td>2.64</td>
        <td>0.25</td>
    </tr>
</table>



Just like the WHERE statement, you can use any Boolean expression in a CASE statement, in cluding function and AND, OR, and NOT statements. The following query will find the avarage temperatures by month when rain/hail was present versus not present after the year 2000:


```
%%sql

SELECT month, 

round(AVG(CASE WHEN rain OR hail THEN temperature ELSE null END),2) as avg_precipitation_temp,

round(AVG(CASE WHEN NOT (rain OR hail) THEN temperature ELSE null END),2) as avg_non_precipitation_temp

FROM station_data
WHERE year > 2000
GROUP BY month
LIMIT 10;
```

     * sqlite:///oreilly_getting_started_with_sql/weather_stations.db
    Done.





<table>
    <tr>
        <th>month</th>
        <th>avg_precipitation_temp</th>
        <th>avg_non_precipitation_temp</th>
    </tr>
    <tr>
        <td>1</td>
        <td>35.62</td>
        <td>41.79</td>
    </tr>
    <tr>
        <td>2</td>
        <td>33.8</td>
        <td>38.9</td>
    </tr>
    <tr>
        <td>3</td>
        <td>46.61</td>
        <td>49.23</td>
    </tr>
    <tr>
        <td>4</td>
        <td>49.03</td>
        <td>52.33</td>
    </tr>
    <tr>
        <td>5</td>
        <td>55.9</td>
        <td>58.91</td>
    </tr>
    <tr>
        <td>6</td>
        <td>55.4</td>
        <td>64.85</td>
    </tr>
    <tr>
        <td>7</td>
        <td>66.98</td>
        <td>70.02</td>
    </tr>
    <tr>
        <td>8</td>
        <td>66.68</td>
        <td>67.89</td>
    </tr>
    <tr>
        <td>9</td>
        <td>60.66</td>
        <td>62.4</td>
    </tr>
    <tr>
        <td>10</td>
        <td>53.01</td>
        <td>56.36</td>
    </tr>
</table>




```

```
