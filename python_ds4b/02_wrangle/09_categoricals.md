# Categoricals
pandas can include categorical data in a DataFrame.



```python
df = pd.DataFrame({"id": [1, 2, 3, 4, 5, 6],
                      "raw_grade": ['a', 'b', 'b', 'a', 'a', 'e']}) 
```

Convert the raw grades to a categorical data type.




```python
df["grade"] = df["raw_grade"].astype("category")
```


```python
df['grade']
```

Rename the categories to more meaningful names (assigning to Series.cat.categories is inplace!).


```python
df["grade"].cat.categories = ["very good", "good", "very bad"]
```


```python
df['grade']
```

Reorder the categories and simultaneously add the missing categories (methods under Series .cat return a new Series by default).


```python
df["grade"] = df["grade"].cat.set_categories(["very bad", "bad", "medium",
                                               "good", "very good"])

```


```python
df['grade']
```


```python
df.sort_values(by="grade")
```

Grouping by a categorical column also shows empty categories.


```python
df.groupby("grade").size()

```
