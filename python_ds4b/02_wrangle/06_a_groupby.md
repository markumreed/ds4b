# Grouping

By “group by” we are referring to a process involving one or more of the following steps:

- **Splitting** the data into groups based on some criteria
- **Applying** a function to each group independently
- **Combining** the results into a data structure



```python
df = pd.DataFrame({'A': ['foo', 'bar', 'foo', 'bar',
                          'foo', 'bar', 'foo', 'foo'],
                   'B': ['one', 'one', 'two', 'three',
                         'two', 'two', 'one', 'three'],
                   'C': np.random.randn(8),
                    'D': np.random.randn(8)}) 
```


```python
df
```

Grouping and then applying the `sum()` function to the resulting groups.


```python
df.groupby('A').sum()
```

Grouping by multiple columns forms a hierarchical index, and again we can apply the sum function.


```python
df.groupby(['A', 'B']).sum()

```
