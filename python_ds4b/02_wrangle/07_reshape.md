# Reshaping
## Stack


```python
tuples = list(zip(*[['bar', 'bar', 'baz', 'baz', 
                     'foo', 'foo', 'qux', 'qux'],
                    ['one', 'two', 'one', 'two',
                     'one', 'two', 'one', 'two']])) 

```


```python
index = pd.MultiIndex.from_tuples(tuples, names=['first', 'second'])
```


```python
df = pd.DataFrame(np.random.randn(8, 2), index=index, columns=['A', 'B'])
```


```python
df2 = df[:4]
```


```python
df2
```

The `stack()` method “compresses” a level in the DataFrame’s columns.


```python
stacked = df2.stack()
```


```python
stacked
```

With a “stacked” DataFrame or Series (having a MultiIndex as the index), the inverse operation of stack() is unstack(), which by default unstacks the last level:


```python
stacked.unstack()
```


```python
stacked.unstack(1)
```


```python
stacked.unstack(0)

## Creating New Columns
```


```python
df['new'] = df['A'] + df['B']
```


```python
df

```

## Removing Columns



```python
df.drop('new', axis='columns') # could also use axis = 1
```


```python
df # new is still there!!

```

## Remove/Drop data (For real)
Use `inplace` to remove **PERMENANTLY**



```python
df.drop('new', axis='columns', inplace=True) 
```

## Dropping rows
Default drop is row (or use axis = 0)


```python
df.drop('second', axis='rows') 
```

## Why 0 for row; 1 for column


```python
df.shape # location 0 for row; 1 for column

```

# Pivot tables


```python
df = pd.DataFrame({'A': ['one', 'one', 'two', 'three'] * 3,
                      'B': ['A', 'B', 'C'] * 4,
                      'C': ['foo', 'foo', 'foo', 'bar', 'bar', 'bar'] * 2,
                      'D': np.random.randn(12),
                      'E': np.random.randn(12)})
```


```python
df
```

We can produce pivot tables from this data very easily:


```python
pd.pivot_table(df, values='D', index=['A', 'B'], columns=['C'])

```
