```python
#!pip install ipython-sql
```


```python
%load_ext sql
```


```python
%sql sqlite://
```




    'Connected: @None'




```python
%%sql   
CREATE TABLE EMPLOYEE(firstname varchar(50),lastname varchar(50));  
INSERT INTO EMPLOYEE VALUES('Tom','Mitchell');  
INSERT INTO EMPLOYEE VALUES('Jack','Ryan');
```

     * sqlite://
    Done.
    1 rows affected.
    1 rows affected.





    []




```python
%sql SELECT * from EMPLOYEE; 
```

     * sqlite://
    Done.





<table>
    <tr>
        <th>firstname</th>
        <th>lastname</th>
    </tr>
    <tr>
        <td>Tom</td>
        <td>Mitchell</td>
    </tr>
    <tr>
        <td>Jack</td>
        <td>Ryan</td>
    </tr>
</table>




```python
!git clone https://github.com/thomasnield/oreilly_getting_started_with_sql.git
```

    fatal: destination path 'oreilly_getting_started_with_sql' already exists and is not an empty directory.



```python
%ls
```

    00_sql_intro.ipynb  01_sql_jupyter.ipynb  [0m[01;34moreilly_getting_started_with_sql[0m/



```python
%sql sqlite:///oreilly_getting_started_with_sql/rexon_metals.db
```




    'Connected: @oreilly_getting_started_with_sql/rexon_metals.db'


