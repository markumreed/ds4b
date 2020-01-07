```python
!pip install pandas_profiling
```

    Requirement already satisfied: pandas_profiling in /usr/local/lib/python3.6/dist-packages (1.4.1)
    Requirement already satisfied: six>=1.9 in /usr/local/lib/python3.6/dist-packages (from pandas_profiling) (1.12.0)
    Requirement already satisfied: jinja2>=2.8 in /usr/local/lib/python3.6/dist-packages (from pandas_profiling) (2.10.1)
    Requirement already satisfied: matplotlib>=1.4 in /usr/local/lib/python3.6/dist-packages (from pandas_profiling) (3.0.3)
    Requirement already satisfied: pandas>=0.19 in /usr/local/lib/python3.6/dist-packages (from pandas_profiling) (0.24.2)
    Requirement already satisfied: MarkupSafe>=0.23 in /usr/local/lib/python3.6/dist-packages (from jinja2>=2.8->pandas_profiling) (1.1.1)
    Requirement already satisfied: numpy>=1.10.0 in /usr/local/lib/python3.6/dist-packages (from matplotlib>=1.4->pandas_profiling) (1.16.5)
    Requirement already satisfied: python-dateutil>=2.1 in /usr/local/lib/python3.6/dist-packages (from matplotlib>=1.4->pandas_profiling) (2.5.3)
    Requirement already satisfied: pyparsing!=2.0.4,!=2.1.2,!=2.1.6,>=2.0.1 in /usr/local/lib/python3.6/dist-packages (from matplotlib>=1.4->pandas_profiling) (2.4.2)
    Requirement already satisfied: kiwisolver>=1.0.1 in /usr/local/lib/python3.6/dist-packages (from matplotlib>=1.4->pandas_profiling) (1.1.0)
    Requirement already satisfied: cycler>=0.10 in /usr/local/lib/python3.6/dist-packages (from matplotlib>=1.4->pandas_profiling) (0.10.0)
    Requirement already satisfied: pytz>=2011k in /usr/local/lib/python3.6/dist-packages (from pandas>=0.19->pandas_profiling) (2018.9)
    Requirement already satisfied: setuptools in /usr/local/lib/python3.6/dist-packages (from kiwisolver>=1.0.1->matplotlib>=1.4->pandas_profiling) (41.2.0)



```python
import matplotlib.pyplot as plt
import pandas as pd
from sklearn import (
    ensemble,
    preprocessing,
    tree,
)
from sklearn.metrics import (
    auc,
    confusion_matrix,
    roc_auc_score,
    roc_curve,
)
from sklearn.model_selection import (
    train_test_split,
    StratifiedKFold,
)
from yellowbrick.classifier import (
    ConfusionMatrix,
    ROCAUC
)
from yellowbrick.model_selection import (
    LearningCurve,
)
```


```python
url = (
    "http://biostat.mc.vanderbilt.edu/"
    "wiki/pub/Main/DataSets/titanic3.xls"
)
```


```python
url
```




    'http://biostat.mc.vanderbilt.edu/wiki/pub/Main/DataSets/titanic3.xls'




```python
#!pip install xlrd
df = pd.read_excel(url)
```


```python
orig_df = df
```


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1309 entries, 0 to 1308
    Data columns (total 14 columns):
    pclass       1309 non-null int64
    survived     1309 non-null int64
    name         1309 non-null object
    sex          1309 non-null object
    age          1046 non-null float64
    sibsp        1309 non-null int64
    parch        1309 non-null int64
    ticket       1309 non-null object
    fare         1308 non-null float64
    cabin        295 non-null object
    embarked     1307 non-null object
    boat         486 non-null object
    body         121 non-null float64
    home.dest    745 non-null object
    dtypes: float64(3), int64(4), object(7)
    memory usage: 143.2+ KB
    None



```python

```


```python
#!pip install pandas_profiling
import pandas_profiling
```


```python
pandas_profiling.ProfileReport(df)
```




<meta charset="UTF-8">

<style>

        .variablerow {
            border: 1px solid #e1e1e8;
            border-top: hidden;
            padding-top: 2em;
            padding-bottom: 2em;
            padding-left: 1em;
            padding-right: 1em;
        }

        .headerrow {
            border: 1px solid #e1e1e8;
            background-color: #f5f5f5;
            padding: 2em;
        }
        .namecol {
            margin-top: -1em;
            overflow-x: auto;
        }

        .dl-horizontal dt {
            text-align: left;
            padding-right: 1em;
            white-space: normal;
        }

        .dl-horizontal dd {
            margin-left: 0;
        }

        .ignore {
            opacity: 0.4;
        }

        .container.pandas-profiling {
            max-width:975px;
        }

        .col-md-12 {
            padding-left: 2em;
        }

        .indent {
            margin-left: 1em;
        }

        .center-img {
            margin-left: auto !important;
            margin-right: auto !important;
            display: block;
        }

        /* Table example_values */
            table.example_values {
                border: 0;
            }

            .example_values th {
                border: 0;
                padding: 0 ;
                color: #555;
                font-weight: 600;
            }

            .example_values tr, .example_values td{
                border: 0;
                padding: 0;
                color: #555;
            }

        /* STATS */
            table.stats {
                border: 0;
            }

            .stats th {
                border: 0;
                padding: 0 2em 0 0;
                color: #555;
                font-weight: 600;
            }

            .stats tr {
                border: 0;
            }

            .stats td{
                color: #555;
                padding: 1px;
                border: 0;
            }


        /* Sample table */
            table.sample {
                border: 0;
                margin-bottom: 2em;
                margin-left:1em;
            }
            .sample tr {
                border:0;
            }
            .sample td, .sample th{
                padding: 0.5em;
                white-space: nowrap;
                border: none;

            }

            .sample thead {
                border-top: 0;
                border-bottom: 2px solid #ddd;
            }

            .sample td {
                width:100%;
            }


        /* There is no good solution available to make the divs equal height and then center ... */
            .histogram {
                margin-top: 3em;
            }
        /* Freq table */

            table.freq {
                margin-bottom: 2em;
                border: 0;
            }
            table.freq th, table.freq tr, table.freq td {
                border: 0;
                padding: 0;
            }

            .freq thead {
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

            }

            td.fillremaining{
                width:auto;
                max-width: none;
            }

            td.number, th.number {
                text-align:right ;
            }

        /* Freq mini */
            .freq.mini td{
                width: 50%;
                padding: 1px;
                font-size: 12px;

            }
            table.freq.mini {
                 width:100%;
            }
            .freq.mini th {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 5em;
                font-weight: 400;
                text-align:right;
                padding-right: 0.5em;
            }

            .missing {
                color: #a94442;
            }
            .alert, .alert > th, .alert > td {
                color: #a94442;
            }


        /* Bars in tables */
            .freq .bar{
                float: left;
                width: 0;
                height: 100%;
                line-height: 20px;
                color: #fff;
                text-align: center;
                background-color: #337ab7;
                border-radius: 3px;
                margin-right: 4px;
            }
            .other .bar {
                background-color: #999;
            }
            .missing .bar{
                background-color: #a94442;
            }
            .tooltip-inner {
                width: 100%;
                white-space: nowrap;
                text-align:left;
            }

            .extrapadding{
                padding: 2em;
            }

            .pp-anchor{

            }

</style>

<div class="container pandas-profiling">
    <div class="row headerrow highlight">
        <h1>Overview</h1>
    </div>
    <div class="row variablerow">
    <div class="col-md-6 namecol">
        <p class="h4">Dataset info</p>
        <table class="stats" style="margin-left: 1em;">
            <tbody>
            <tr>
                <th>Number of variables</th>
                <td>14 </td>
            </tr>
            <tr>
                <th>Number of observations</th>
                <td>1309 </td>
            </tr>
            <tr>
                <th>Total Missing (%)</th>
                <td>21.0% </td>
            </tr>
            <tr>
                <th>Total size in memory</th>
                <td>143.2 KiB </td>
            </tr>
            <tr>
                <th>Average record size in memory</th>
                <td>112.1 B </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-6 namecol">
        <p class="h4">Variables types</p>
        <table class="stats" style="margin-left: 1em;">
            <tbody>
            <tr>
                <th>Numeric</th>
                <td>6 </td>
            </tr>
            <tr>
                <th>Categorical</th>
                <td>7 </td>
            </tr>
            <tr>
                <th>Boolean</th>
                <td>1 </td>
            </tr>
            <tr>
                <th>Date</th>
                <td>0 </td>
            </tr>
            <tr>
                <th>Text (Unique)</th>
                <td>0 </td>
            </tr>
            <tr>
                <th>Rejected</th>
                <td>0 </td>
            </tr>
            <tr>
                <th>Unsupported</th>
                <td>0 </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-12" style="padding-left: 1em;">

        <p class="h4">Warnings</p>
        <ul class="list-unstyled"><li><a href="#pp_var_age"><code>age</code></a> has 263 / 20.1% missing values <span class="label label-default">Missing</span></li><li><a href="#pp_var_boat"><code>boat</code></a> has 823 / 62.9% missing values <span class="label label-default">Missing</span></li><li><a href="#pp_var_body"><code>body</code></a> has 1188 / 90.8% missing values <span class="label label-default">Missing</span></li><li><a href="#pp_var_cabin"><code>cabin</code></a> has 1014 / 77.5% missing values <span class="label label-default">Missing</span></li><li><a href="#pp_var_cabin"><code>cabin</code></a> has a high cardinality: 187 distinct values  <span class="label label-warning">Warning</span></li><li><a href="#pp_var_fare"><code>fare</code></a> has 17 / 1.3% zeros <span class="label label-info">Zeros</span></li><li><a href="#pp_var_home.dest"><code>home.dest</code></a> has 564 / 43.1% missing values <span class="label label-default">Missing</span></li><li><a href="#pp_var_home.dest"><code>home.dest</code></a> has a high cardinality: 370 distinct values  <span class="label label-warning">Warning</span></li><li><a href="#pp_var_name"><code>name</code></a> has a high cardinality: 1307 distinct values  <span class="label label-warning">Warning</span></li><li><a href="#pp_var_parch"><code>parch</code></a> has 1002 / 76.5% zeros <span class="label label-info">Zeros</span></li><li><a href="#pp_var_sibsp"><code>sibsp</code></a> has 891 / 68.1% zeros <span class="label label-info">Zeros</span></li><li><a href="#pp_var_ticket"><code>ticket</code></a> has a high cardinality: 939 distinct values  <span class="label label-warning">Warning</span></li> </ul>
    </div>
</div>
    <div class="row headerrow highlight">
        <h1>Variables</h1>
    </div>
    <div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_age">age<br/>
            <small>Numeric</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Distinct count</th>
                    <td>99</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>7.6%</td>
                </tr>
                <tr class="alert">
                    <th>Missing (%)</th>
                    <td>20.1%</td>
                </tr>
                <tr class="alert">
                    <th>Missing (n)</th>
                    <td>263</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (n)</th>
                    <td>0</td>
                </tr>
            </table>

        </div>
        <div class="col-sm-6">
            <table class="stats ">

                <tr>
                    <th>Mean</th>
                    <td>29.881</td>
                </tr>
                <tr>
                    <th>Minimum</th>
                    <td>0.1667</td>
                </tr>
                <tr>
                    <th>Maximum</th>
                    <td>80</td>
                </tr>
                <tr class="ignore">
                    <th>Zeros (%)</th>
                    <td>0.0%</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minihistogram4581289135072909039">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAATFJREFUeJzt3cGNglAUQNFxYkkWYU%2Bup6cpwp6wAXMDJoSnnrMn%2BZvL930gnpZlWX6Ap36PXgBMdj56AUe53P43X3P/u%2B6wEiazg0AQCASBQPjaGeQVW%2BcWM8v7s4NAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEr7vvyGe9788OAkEgEAQCQSAQBAJBIBAEAkEgEDwoHMbDxVnsIBAEAkEgEAQCQSAQBAJh3DGvY04mOU37l9tXAmEbN5T1/MSCIBAIAoEwbkhnfw5C1rODQBAIBIFAEAgEQzqrfOtgLxB28wlRjXvVBCYxg0AQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUB4ALFNJ5gUfuDGAAAAAElFTkSuQmCC">

</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#descriptives4581289135072909039,#minihistogram4581289135072909039"
       aria-expanded="false" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="row collapse col-md-12" id="descriptives4581289135072909039">
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#quantiles4581289135072909039"
                                                  aria-controls="quantiles4581289135072909039" role="tab"
                                                  data-toggle="tab">Statistics</a></li>
        <li role="presentation"><a href="#histogram4581289135072909039" aria-controls="histogram4581289135072909039"
                                   role="tab" data-toggle="tab">Histogram</a></li>
        <li role="presentation"><a href="#common4581289135072909039" aria-controls="common4581289135072909039"
                                   role="tab" data-toggle="tab">Common Values</a></li>
        <li role="presentation"><a href="#extreme4581289135072909039" aria-controls="extreme4581289135072909039"
                                   role="tab" data-toggle="tab">Extreme Values</a></li>

    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active row" id="quantiles4581289135072909039">
            <div class="col-md-4 col-md-offset-1">
                <p class="h4">Quantile statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Minimum</th>
                        <td>0.1667</td>
                    </tr>
                    <tr>
                        <th>5-th percentile</th>
                        <td>5</td>
                    </tr>
                    <tr>
                        <th>Q1</th>
                        <td>21</td>
                    </tr>
                    <tr>
                        <th>Median</th>
                        <td>28</td>
                    </tr>
                    <tr>
                        <th>Q3</th>
                        <td>39</td>
                    </tr>
                    <tr>
                        <th>95-th percentile</th>
                        <td>57</td>
                    </tr>
                    <tr>
                        <th>Maximum</th>
                        <td>80</td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td>79.833</td>
                    </tr>
                    <tr>
                        <th>Interquartile range</th>
                        <td>18</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4 col-md-offset-2">
                <p class="h4">Descriptive statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Standard deviation</th>
                        <td>14.413</td>
                    </tr>
                    <tr>
                        <th>Coef of variation</th>
                        <td>0.48236</td>
                    </tr>
                    <tr>
                        <th>Kurtosis</th>
                        <td>0.14695</td>
                    </tr>
                    <tr>
                        <th>Mean</th>
                        <td>29.881</td>
                    </tr>
                    <tr>
                        <th>MAD</th>
                        <td>11.262</td>
                    </tr>
                    <tr class="">
                        <th>Skewness</th>
                        <td>0.40767</td>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>31256</td>
                    </tr>
                    <tr>
                        <th>Variance</th>
                        <td>207.75</td>
                    </tr>
                    <tr>
                        <th>Memory size</th>
                        <td>10.3 KiB</td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane col-md-8 col-md-offset-2" id="histogram4581289135072909039">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzt3X1UlXW%2B//8XN8mkAoqKzpipZViIpnlDoR0Mi/FmNPMOnWNmx0odknSkMLNTLU1sqcdMXKbN2JlGV5Iuz3iTd5VZWc40ljYbJE%2BirpSDQcoOJSFurt8f/eTbFkuQD177unw%2B1nKZn2vz2e/X7L2Zl9e12QZYlmUJAAAAxgTaPQAAAIDbULAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGHBdg9wrSgsPGt0v8DAAEVENNGZMyWqqrKM7m03t2Zzay6JbE7k1lwS2ZyoIXO1ahVqdL/a4gyWQwUGBiggIECBgQF2j2KcW7O5NZdENidyay6JbE7kxlwULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwLNjuAQB/Nejlj%2B0eoU62T%2B9r9wgAgP8fZ7AAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAw1xasvLw8JScnKzY2VnFxcZo1a5aKi4t18uRJde7cWV27dvX59ec//7n6a7dt26ahQ4eqR48eGjFihPbu3WtjEgAA4DTBdg/QUKZMmaKYmBjt3r1bZ8%2BeVXJysl566SVNnTpVkuTxeC75dTk5OUpLS1NGRobuvPNO7dy5U48//rh27NihNm3aXM0IAADAoVx5Bqu4uFgxMTGaOXOmmjRpojZt2uiBBx7Q/v37L/u169evV3x8vOLj4xUSEqJhw4YpKipKmzdvvgqTAwAAN3BlwQoLC1N6erpatmxZvZafn6/IyMjqPz/11FPq16%2Bf7rzzTi1evFjl5eWSpOzsbEVHR/vsFx0d/bNnvAAAAC7m2kuEP%2BXxeLRmzRqtWLFCjRo1Uo8ePXTffffpxRdfVE5OjqZNm6bg4GA98cQT8nq9Cg8P9/n68PBwHTlypNb3V1BQoMLCQp%2B14ODGPgWvvoKCAn1%2BdxM3Z2tIwcH2/e/l5sfMrdncmksimxO5MZfrC9Znn32mqVOnaubMmYqLi5MkrVu3rvp4t27dNHnyZK1cuVJPPPGEJMmyrHrdZ2ZmpjIyMnzWkpOTlZKSUq99LyUs7Hrje/oLN2drCPct%2BsjuEWpt/4sD7R6hztz6fHRrLolsTuSmXK4uWLt379aTTz6pZ599VsOHD//Z27Vt21bffvutLMtS8%2BbN5fV6fY57vV5FRETU%2Bn6TkpKUkJDgsxYc3FhFRSV1C/ALgoICFRZ2vYqLz6uyssrYvv7AzdnwI5OvhYbm1uejW3NJZHOihszVvHkTo/vVlmsL1ueff660tDQtXbpU/fr1q17ft2%2BfDh48WP3ThJJ09OhRtW3bVgEBAYqJiVFWVpbPXh6PR0OGDKn1fUdGRta4HFhYeFYVFeZfDJWVVQ2yrz9wc7ZrnRMfV7c%2BH92aSyKbE7kpl3sudv5ERUWF5syZo9TUVJ9yJUmhoaFavny5Nm3apPLycnk8Hv35z3/WuHHjJEljxozRJ598oj179qisrEwbNmzQ8ePHNWzYMDuiAAAAB3LlGayDBw8qNzdX8%2BbN07x583yO7dixQ0uWLFFGRob%2B8z//U6GhoXrwwQf10EMPSZKioqK0aNEipaenKy8vT506ddLKlSvVqlUrO6IAAAAHcmXB6tWrlw4fPvyzx9u2bav77rvvZ48nJiYqMTGxIUYDAADXAFdeIgQAALATBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIa5tmDl5eUpOTlZsbGxiouL06xZs1RcXCxJysnJ0fjx49WzZ08lJiZq9erVPl%2B7bds2DR06VD169NCIESO0d%2B9eOyIAAACHcm3BmjJlisLCwrR7925t3LhRX331lV566SWVlpZq8uTJuvPOO/XRRx9pyZIlWrlypXbt2iXpx/KVlpam1NRU/f3vf9fEiRP1%2BOOP69SpUzYnAgAATuHKglVcXKyYmBjNnDlTTZo0UZs2bfTAAw9o//792rNnj8rLyzV16lQ1btxYXbp00ejRo5WZmSlJWr9%2BveLj4xUfH6%2BQkBANGzZMUVFR2rx5s82pAACAU7iyYIWFhSk9PV0tW7asXsvPz1dkZKSys7PVuXNnBQUFVR%2BLjo5WVlaWJCk7O1vR0dE%2B%2B0VHR8vj8Vyd4QEAgOMF2z3A1eDxeLRmzRqtWLFC27dvV1hYmM/xZs2ayev1qqqqSl6vV%2BHh4T7Hw8PDdeTIkVrfX0FBgQoLC33WgoMbKzIy8spDXCQoKNDndzdxczb8KDjYOY%2BtW5%2BPbs0lkc2J3JjL9QXrs88%2B09SpUzVz5kzFxcVp%2B/btl7xdQEBA9X9bllWv%2B8zMzFRGRobPWnJyslJSUuq176WEhV1vfE9/4eZs17rmzZvYPUKdufX56NZcEtmcyE25XF2wdu/erSeffFLPPvushg8fLkmKiIjQ8ePHfW7n9XrVrFkzBQYGqnnz5vJ6vTWOR0RE1Pp%2Bk5KSlJCQ4LMWHNxYRUUlVxbkEoKCAhUWdr2Ki8%2BrsrLK2L7%2BwM3Z8COTr4WG5tbno1tzSWRzoobMZddf6FxbsD7//HOlpaVp6dKl6tevX/V6TEyM3nzzTVVUVCg4%2BMf4Ho9Ht99%2Be/XxC%2B/HusDj8WjIkCG1vu/IyMgalwMLC8%2BqosL8i6GysqpB9vUHbs52rXPi4%2BrW56Nbc0lkcyI35XLPxc6fqKio0Jw5c5SamupTriQpPj5eTZs21YoVK3T%2B/Hl98cUX2rBhg8aNGydJGjNmjD755BPt2bNHZWVl2rBhg44fP65hw4bZEQUAADiQK89gHTx4ULm5uZo3b57mzZvnc2zHjh169dVX9dxzz2nVqlVq2bKlZsyYof79%2B0uSoqKitGjRIqWnpysvL0%2BdOnXSypUr1apVKxuSAAAAJ3JlwerVq5cOHz78i7d58803f/ZYYmKiEhMTTY8FAACuEa68RAgAAGAnChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADDM7wpWQkKCMjIylJ%2Bfb/coAAAAV8TvCtbIkSO1bds23XvvvXrkkUe0a9cuVVRU2D0WAABArfldwUpOTta2bdv01ltv6ZZbbtH8%2BfMVHx%2BvhQsX6tixY3aPBwAAcFl%2BV7Au6NKli9LS0vT%2B%2B%2B9r9uzZeuuttzR48GBNmjRJ//rXv%2BweDwAA4Gf5bcEqLy/Xtm3b9OijjyotLU2tW7fW008/rdtuu00TJ07Uli1b7B4RAADgkoLtHuBiubm52rBhg/72t7%2BppKREv/3tb/WXv/xFPXv2rL5N79699fzzz2vo0KE2TgoAAHBpflewhgwZoo4dO2ry5MkaPny4mjVrVuM28fHxOnPmjA3TAQAAXJ7fFaw33nhDffr0ueztvvjii6swDQAAQN353XuwOnfurClTpujdd9%2BtXvvv//5vPfroo/J6vTZOBgAAUDt%2BV7DS09N19uxZderUqXqtf//%2Bqqqq0oIFC2ycDAAAoHb87hLh3r17tWXLFjVv3rx6rUOHDlq0aJF%2B97vf2TgZAABA7fjdGazS0lKFhITUWA8MDNT58%2BdtmAgAAKBu/K5g9e7dWwsWLNB3331XvfbNN9/ohRde8PmoBgAAAH/ld5cIZ8%2Berf/4j//QXXfdpaZNm6qqqkolJSVq166d/vrXv9o9HgAAwGX5XcFq166d3n77bX344Yf6%2BuuvFRgYqI4dO6pfv34KCgqyezwABgx6%2BWO7R6iT/S8OtHsEAA7jdwVLkho1aqR7773X7jEAAACuiN8VrBMnTmjx4sX66quvVFpaWuP4e%2B%2B9Z8NUAAAAted3BWv27NkqKChQv3791LhxY7vHAQAAqDO/K1hZWVl67733FBERYfcoAAAAV8TvPqahRYsWnLkCAACO5ncFa/LkycrIyJBlWXaPAgAAcEX87hLhhx9%2BqM8//1wbN27UDTfcoMBA3w64bt06myYDAACoHb8rWE2bNtW//du/1Xufjz76SGlpaYqNjdWSJUuq1zdu3KjZs2fruuuu87n92rVr1a1bN1VVVWnp0qXaunWriouL1a1bNz3//PNq165dvWcCAADXBr8rWOnp6fXe47XXXtOGDRvUvn37Sx7v3bv3z34q/Nq1a7Vlyxa99tprat26tZYsWaLk5GRt2rRJAQEB9Z4NAAC4n9%2B9B0uSjh49qmXLlunpp5%2BuXjtw4ECtvz4kJOQXC9YvyczM1MSJE3XzzTeradOmmjFjhnJzc/XFF1/UeS8AAHBt8rszWPv27dOjjz6qjh076vjx40pPT9eJEyc0YcIEvfzyyxowYMBl95gwYcIvHs/Pz9fDDz%2BsrKwshYWFKSUlRffff79KS0t15MgRRUdHV9%2B2adOmat%2B%2BvTwej7p3716rDAUFBSosLPRZCw5urMjIyFp9fW0EBQX6/O4mbs4G53Lb89HNrzOyOY8bc/ldwVqyZImefPJJPfTQQ%2BrWrZukH/99wgULFmj58uW1Kli/JCIiQh06dNAf//hHderUSe%2B8846eeuopRUZG6qabbpJlWQoPD/f5mvDwcBUVFdX6PjIzM5WRkeGzlpycrJSUlHrNfilhYdcb39NfuDkbnMetz0e35pLI5kRuyuV3Bet///d/tWbNGknyec/TwIEDNXv27Hrv379/f/Xv37/6z0OGDNE777yjjRs3KjU1VZLq/RERSUlJSkhI8FkLDm6soqKSeu37U0FBgQoLu17FxedVWVllbF9/4OZscC63PR/d/Dojm/M0ZK7mzZsY3a%2B2/K5ghYaGqrS0VI0aNfJZLygoqLFmStu2bZWVlaVmzZopMDBQXq/X57jX61WLFi1qvV9kZGSNy4GFhWdVUWH%2BxVBZWdUg%2B/oDN2eD87j1%2BejWXBLZnMhNufzuYucdd9yh%2BfPn69y5c9Vrx44dU1pamu6666567//mm29q27ZtPmu5ublq166dQkJCdMsttyg7O7v6WHFxsb7%2B%2Buvqy5UAAACX43cF6%2Bmnn9aBAwcUGxursrIy3XHHHRo8eLC8Xq9mzZpV7/1/%2BOEHzZ07Vx6PR%2BXl5dq6das%2B/PBDjR07VpI0btw4vfHGG8rNzdW5c%2Be0aNEi3XbbberatWu97xsAAFwb/O4SYZs2bbR161Z98MEHOnbsmH71q1%2BpY8eO6tu3b60/h%2BpCGaqoqJAkvfvuu5Ikj8ejCRMmqKSkRE888YQKCwt1ww03aPny5YqJiZEkjR07VoWFhXrwwQdVUlKi2NjYGm9YBwAA%2BCUBFv/o31VRWHjW6H7BwYFq3ryJiopKXHO9%2BgJ/yTbo5Y9tu2/4l/0vDrT9%2BWiav7zOGgLZnKchc7VqFWp0v9ryuzNYCQkJv3im6r333ruK0wAAANSd3xWswYMH%2BxSsyspKHTt2TB6PRw899JCNkwEAANSO3xWsC59FdbGdO3fqH//4x1WeBgAAoO787qcIf869996rt99%2B2%2B4xAAAALssxBevQoUP1/oR1AACAq8HvLhFe%2BDyqnzp//rxyc3OVmJhow0QAAAB143cFq0OHDjV%2BijAkJESjRo3S6NGjbZoKAACg9vyuYC1YsMDuEQAAAOrF7wrW3/72t1rfdvjw4Q04CQAAwJXxu4L1zDPPqKqqqsYb2gMCAnzWAgICKFgAAMAv%2BV3B%2BtOf/qTVq1drypQp6ty5syzL0uHDh/Xaa69p/Pjxio2NtXtEAACAX%2BR3BWvBggVatWqVWrduXb3Wq1cvtWvXTpMmTdLWrVttnA4AAODy/O5zsI4fP67w8PAa62FhYcrLy7NhIgAAgLrxu4LVtm1bLViwQEVFRdVrxcXFWrx4sW688UYbJwMAAKgdv7tEOHv2bM2cOVOZmZlq0qSJAgMDde7cOf3qV7/S8uXL7R4PAADgsvyuYPXr10979uzRBx98oFOnTsmyLLVu3Vp33323QkND7R4PAADgsvyuYEnS9ddfrwEDBujUqVNq166d3eMAAADUid%2B9B6u0tFRpaWnq0aOHBg0aJOnH92A98sgjKi4utnk6AACAy/O7grVw4ULl5ORo0aJFCgz8f%2BNVVlZq0aJFNk4GAABQO35XsHbu3KlXXnlFAwcOrP5Hn8PCwpSenq5du3bZPB0AAMDl%2BV3BKikpUYcOHWqsR0RE6Pvvv7/6AwEAANSR3xWsG2%2B8Uf/4xz8kyeffHtyxY4d%2B85vf2DUWAABArfndTxH%2B/ve/17Rp0zRy5EhVVVXp9ddfV1ZWlnbu3KlnnnnG7vEAAAAuy%2B8KVlJSkoKDg7VmzRoFBQXp1VdfVceOHbVo0SINHDjQ7vEAAAAuy%2B8K1pkzZzRy5EiNHDnS7lEAAACuiN%2B9B2vAgAE%2B770CAABwGr8rWLGxsdq%2BfbvdYwAAAFwxv7tE%2BOtf/1ovvviiVq1apRtvvFHXXXedz/HFixfbNBkAAEDt%2BF3BOnLkiG666SZJUlFRkc3TAAAA1J3fFKwZM2ZoyZIl%2Butf/1q9tnz5ciUnJ9s4FQAAQN35zXuwdu/eXWNt1apVNkwCAABQP35TsC71k4P8NCEAAHAivylYF/5h58utAQAA%2BDu/KVgAAABuQcECAAAwzG9%2BirC8vFwzZ8687BqfgwUAAPyd3xSsnj17qqCg4LJrAAAA/s5vCtZPP/8KAADAyXgPFgAAgGEULAAAAMP85hIhAPirXs/ssHuEOtk%2Bva/dIwDXPM5gAQAAGEbBAgAAMIyCBQAAYJhrC9ZHH32kuLg4zZgxo8axbdu2aejQoerRo4dGjBihvXv3Vh%2BrqqrSkiVLNGDAAPXu3VuTJk3SiRMnruboAADA4VxZsF577TXNmzdP7du3r3EsJydHaWlpSk1N1d///ndNnDhRjz/%2BuE6dOiVJWrt2rbZs2aJVq1bp/fffV4cOHZScnCzLsq52DAAA4FCuLFghISHasGHDJQvW%2BvXrFR8fr/j4eIWEhGjYsGGKiorS5s2bJUmZmZmaOHGibr75ZjVt2lQzZsxQbm6uvvjii6sdAwAAOJQrC9aECRMUGhp6yWPZ2dmKjo72WYuOjpbH41FpaamOHDnic7xp06Zq3769PB5Pg84MAADc45r7HCyv16vw8HCftfDwcB05ckTfffedLMu65PGioqJa30dBQYEKCwt91oKDGysyMvLKB79IUFCgz%2B9u4uZswNUQHHz5146bX2dkcx435rrmCpaky76fqr7vt8rMzFRGRobPWnJyslJSUuq176WEhV1vfE9/4eZsQENq3rxJrW/r5tcZ2ZzHTbmuuYLVvHlzeb1enzWv16uIiAg1a9ZMgYGBlzzeokWLWt9HUlKSEhISfNaCgxurqKjkyge/SFBQoMLCrldx8XlVVlYZ29cfuDkbcDXU5nuNm19nZHOehsxVl79wmHTNFayYmBhlZWX5rHk8Hg0ZMkQhISG65ZZblJ2drT59%2BkiSiouL9fXXX6tbt261vo/IyMgalwMLC8%2BqosL8i6GysqpB9vUHbs4GNKS6vG7c/Dojm/O4KZd7LnbW0pgxY/TJJ59oz549Kisr04YNG3T8%2BHENGzZMkjRu3Di98cYbys3N1blz57Ro0SLddttt6tq1q82TAwAAp3DlGawLZaiiokKS9O6770r68UxVVFSUFi1apPT0dOXl5alTp05auXKlWrVqJUkaO3asCgsL9eCDD6qkpESxsbE13k8FAADwS1xZsC73kQqJiYlKTEy85LGAgAClpKQ0yBvSAQDAteGau0QIAADQ0ChYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAw4LtHgD1c9%2Bij%2Bweoda2T%2B9r9wgAAFwVnMECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADONzsADAZQa9/LHdI9Qan48Ht%2BIMFgAAgGEULAAAAMO4RIirxkmXLQAAqA/OYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMuyY/aLRz58667rrrFBAQUL02ZswYPfvss9q3b58WL16so0eP6te//rUmT56sYcOG2TgtAABwmmuyYEnSjh07dMMNN/isFRQU6A9/%2BIOeeeYZDR06VJ999pmmTp2qjh07qmvXrjZNCgAAnIZLhD%2BxZcsWdejQQaNGjVJISIji4uKUkJCg9evX2z0aAABwkGv2DNbixYt14MABnTt3ToMGDdKsWbOUnZ2t6Ohon9tFR0dr%2B/btddq7oKBAhYWFPmvBwY0VGRlZ77kvCAqiGwNwvuBg89/LLnx/dOP3Sbdmc2Oua7Jgde/eXXFxcXrppZd04sQJTZ8%2BXS%2B88IK8Xq9at27tc9tmzZqpqKioTvtnZmYqIyPDZy05OVkpKSn1nh0A3KR58yYNtndY2PUNtrfd3JrNTbmuyYKVmZlZ/d8333yzUlNTNXXqVPXs2dPI/klJSUpISPBZCw5urKKiEiP7Sz%2B2fDc9EQFcm0x%2BX7zgwvfH4uLzqqysMr6/ndyarSFzNWSJ/yXXZMG62A033KDKykoFBgbK6/X6HCsqKlJERESd9ouMjKxxObCw8KwqKtzzYgAAExry%2B2JlZZVrv%2B%2B6NZubcrnnYmctHTp0SAsWLPBZy83NVaNGjRQfH6%2BsrCyfY1lZWbr99tuv5ogAAMDhrrmC1aJFC2VmZmrVqlX64YcfdOzYMS1dulRJSUm6//77lZeXp/Xr16usrEwffPCBPvjgA40ZM8busQEAgINccwWrdevWWrVqlXbv3q3Y2FiNHTtWd999t5588km1aNFCK1eu1Jo1a9SzZ0/Nnz9fCxcu1K233mr32AAAwEGuyfdg9e7dW%2BvWrfvZY5s2bbrKEwEAADe55s5gAQAANDQKFgAAgGEULAAAAMOuyfdgAQD8w6CXP7Z7hDrZPr2v3SPAITiDBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMCwYLsHAADAKQa9/LHdI9TJ9ul97R7hmsUZLAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBesS8vLy9Nhjjyk2Nlb33HOPFi5cqKqqKrvHAgAADsHnYF3CtGnT1KVLF7377rs6ffq0Jk%2BerJYtW%2Brhhx%2B2ezQAAGrNSZ/btf/FgXaPYBRnsC7i8Xj05ZdfKjU1VaGhoerQoYMmTpyozMxMu0cDAAAOwRmsi2RnZ6tt27YKDw%2BvXuvSpYuOHTumc%2BfOqWnTppfdo6CgQIWFhT5rwcGNFRkZaWzOoCC6MQDAXdz0/20UrIt4vV6FhYX5rF0oW0VFRbUqWJmZmcrIyPBZe/zxxzVt2jRjcxYUFOgvf/mTtj2RZLS4%2BYOCggJlZmYqKcld2dyaSyKbE7k1l0Q2JyooKNCyZctclcs9VdEgy7Lq9fVJSUnauHGjz6%2BkpCRD0/2osLBQGRkZNc6UuYFbs7k1l0Q2J3JrLolsTuTGXJzBukhERIS8Xq/PmtfrVUBAgCIiImq1R2RkpGsaOAAAqDvOYF0kJiZG%2Bfn5OnPmTPWax%2BNRp06d1KRJExsnAwAATkHBukh0dLS6du2qxYsX69y5c8rNzdXrr7%2BucePG2T0aAABwiKDnn3/%2BebuH8Dd33323tm7dqrlz5%2Brtt9/WqFGjNGnSJAUEBNg9mo8mTZqoT58%2Brjyz5tZsbs0lkc2J3JpLIpsTuS1XgFXfd3QDAADAB5cIAQAADKNgAQAAGEbBAgAAMIyy58O3AAAJ%2B0lEQVSCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYDlQXl6eHnvsMcXGxuqee%2B7RwoULVVVVZfdYV%2BSjjz5SXFycZsyYUePYtm3bNHToUPXo0UMjRozQ3r17bZjwyuTl5Sk5OVmxsbGKi4vTrFmzVFxcLEnKycnR%2BPHj1bNnTyUmJmr16tU2T1s3X375pR566CH17NlTcXFxmj59ugoLCyVJ%2B/bt06hRo3THHXdoyJAh2rx5s83TXpn58%2Berc%2BfO1X92eq7OnTsrJiZGXbt2rf41d%2B5cSc7PJkkrVqxQv3791L17d02cOFEnT56U5Oxs//znP30er65duyomJqb6eenkbIcOHdKECRPUq1cv9e3bV6mpqTpz5owkZ%2BeqwYLjPPDAA9acOXOs4uJi69ixY1ZiYqK1evVqu8eqs1WrVlmJiYnW2LFjrenTp/scO3TokBUTE2Pt2bPHKi0ttTZt2mTdfvvtVn5%2Bvk3T1s3vfvc7a9asWda5c%2Bes/Px8a8SIEdbs2bOt8%2BfPW3fffbe1bNkyq6SkxMrKyrL69Olj7dy50%2B6Ra6WsrMy66667rIyMDKusrMw6ffq0NX78eOsPf/iD9c0331jdu3e31q9fb5WWlloff/yx1a1bN%2Btf//qX3WPXyaFDh6w%2BffpYUVFRlmVZrsgVFRVlnThxosa6G7KtWbPGGjhwoJWbm2udPXvWmjt3rjV37lxXZLvYihUrrCeeeMLR2crLy62%2BfftaixcvtsrKyqwzZ85YDz/8sDVt2jRH57oUzmA5jMfj0ZdffqnU1FSFhoaqQ4cOmjhxojIzM%2B0erc5CQkK0YcMGtW/fvsax9evXKz4%2BXvHx8QoJCdGwYcMUFRXliL/NFBcXKyYmRjNnzlSTJk3Upk0bPfDAA9q/f7/27Nmj8vJyTZ06VY0bN1aXLl00evRoxzx%2B58%2Bf14wZMzR58mQ1atRIERERuu%2B%2B%2B/TVV19py5Yt6tChg0aNGqWQkBDFxcUpISFB69evt3vsWquqqtJzzz2niRMnVq%2B5IdfPcUO21atXa8aMGbrpppvUtGlTzZkzR3PmzHFFtp/6v//7P73%2B%2But66qmnHJ2tsLBQhYWFuv/%2B%2B9WoUSM1b95c9913n3Jychyd61IoWA6TnZ2ttm3bKjw8vHqtS5cuOnbsmM6dO2fjZHU3YcIEhYaGXvJYdna2oqOjfdaio6Pl8Xiuxmj1EhYWpvT0dLVs2bJ6LT8/X5GRkcrOzlbnzp0VFBRUfSw6OlpZWVl2jFpn4eHhGj16tIKDgyVJR48e1f/8z/9o0KBBP/uYOSWbJK1bt04hISEaOnRo9ZobcknS4sWL1b9/f/Xq1UvPPvusSkpKHJ/tm2%2B%2B0cmTJ/Xdd99p8ODBio2NVUpKis6cOeP4bBdbunSpRo4cqd/85jeOzta6dWvddtttyszMVElJiU6fPq1du3apf//%2Bjs51KRQsh/F6vQoLC/NZu1C2ioqK7BipQXi9Xp8SKf2Y04kZPR6P1qxZo6lTp17y8WvWrJm8Xq%2Bj3keXl5enmJgYDR48WF27dlVKSsrPZnPKY/btt99q2bJleu6553zWnZ5Lkrp37664uDjt2rVLmZmZOnjwoF544QXHZzt16pQkaceOHXr99de1adMmnTp1SnPmzHF8tp86efKkdu3apYcffliSs5%2BTgYGBWrZsmd577z3dcccdiouLU0VFhWbOnOnoXJdCwXIgy7LsHuGqcEPOzz77TJMmTdLMmTMVFxf3s7cLCAi4ilPVX9u2beXxeLRjxw4dP35cTz31lN0j1Vt6erpGjBihTp062T2KcZmZmRo9erQaNWqkm2%2B%2BWampqdq6davKy8vtHq1eLnyPeOSRR9S6dWu1adNG06ZN0%2B7du22ezKy1a9cqMTFRrVq1snuUevvhhx80ZcoUDRw4UPv379eHH36o0NBQpaam2j2acRQsh4mIiJDX6/VZ83q9CggIUEREhE1Tmde8efNL5nRSxt27d%2Buxxx7T7NmzNWHCBEk/Pn4X/23M6/WqWbNmCgx01ssxICBAHTp00IwZM7R161YFBwfXeMyKiooc8Zjt27dPBw4cUHJyco1jl3ouOiXXz7nhhhtUWVmpwMBAR2e7cBn%2Bp2c92rZtK8uyVF5e7uhsP7Vz504lJCRU/9nJz8l9%2B/bp5MmT%2BuMf/6jQ0FC1bt1aKSkpeueddxz/fLyYs76jQzExMcrPz6/%2BkVbpx0tQnTp1UpMmTWyczKyYmJga1909Ho9uv/12myaqm88//1xpaWlaunSphg8fXr0eExOjw4cPq6KionrNSbn27dun3/72tz6XMy8Uw27dutV4zLKyshyRbfPmzTp9%2BrTuuecexcbGasSIEZKk2NhYRUVFOTaX9OOPxC9YsMBnLTc3V40aNVJ8fLyjs7Vp00ZNmzZVTk5O9VpeXp6uu%2B46x2e7ICcnR3l5eerbt2/1WteuXR2brbKyUlVVVT5XKH744QdJUlxcnGNzXZKtP8OIKzJ69Ghr9uzZ1tmzZ60jR45YCQkJ1po1a%2Bwe64qlpaXV%2BJiGw4cPW127drXef/99q7S01Fq/fr3Vo0cPq6CgwKYpa6%2B8vNwaNGiQtW7duhrHysrKrHvuucd65ZVXrO%2B//946ePCg1atXL%2Bv999%2B/%2BoNegeLiYisuLs5asGCB9f3331unT5%2B2Jk2aZP3%2B97%2B3vv32W6tHjx7WW2%2B9ZZWWllp79uyxunXrZuXk5Ng99mV5vV4rPz%2B/%2BteBAwesqKgoKz8/38rLy3NsLsuyrFOnTlndu3e3Vq5caZWVlVlHjx61Bg8ebM2dO9fRj9kF8%2BfPtwYMGGAdP37c%2Bvbbb62kpCRr1qxZrshmWZa1YcMGq0%2BfPj5rTs525swZq0%2BfPtZ//dd/Wd9//7115swZa8qUKda///u/OzrXpVCwHCg/P9965JFHrG7dullxcXHWK6%2B8YlVVVdk9Vp3FxMRYMTEx1q233mrdeuut1X%2B%2BYOfOnVZiYqLVpUsX6/7777c%2B/fRTG6etvX/%2B859WVFRUdZ6f/jp58qR1%2BPBha%2BzYsVZMTIzVv39/a%2B3atXaPXCdffvmlNX78eKtbt27WnXfeaU2fPt06deqUZVmW9emnn1rDhg2zunTpYiUmJjrm870uduLEierPwbIs5%2Bf69NNPraSkJKt79%2B5Wnz59rPT0dKu0tLT6mJOzlZWVWc8//7zVu3dvq3v37lZaWpp17tw5y7Kcn82yLOvVV1%2B1hgwZUmPdydk8Ho81fvx4q1evXlZcXJwrv4dYlmUFWJYL3kkMAADgR3gPFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAY9v8BfSeVTQ5s9DIAAAAASUVORK5CYII%3D"/>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12" id="common4581289135072909039">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">24.0</td>
        <td class="number">47</td>
        <td class="number">3.6%</td>
        <td>
            <div class="bar" style="width:7%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">22.0</td>
        <td class="number">43</td>
        <td class="number">3.3%</td>
        <td>
            <div class="bar" style="width:7%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">21.0</td>
        <td class="number">41</td>
        <td class="number">3.1%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">30.0</td>
        <td class="number">40</td>
        <td class="number">3.1%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">18.0</td>
        <td class="number">39</td>
        <td class="number">3.0%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">25.0</td>
        <td class="number">34</td>
        <td class="number">2.6%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">28.0</td>
        <td class="number">32</td>
        <td class="number">2.4%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">36.0</td>
        <td class="number">31</td>
        <td class="number">2.4%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">27.0</td>
        <td class="number">30</td>
        <td class="number">2.3%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">29.0</td>
        <td class="number">30</td>
        <td class="number">2.3%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (88)</td>
        <td class="number">679</td>
        <td class="number">51.9%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="missing">
        <td class="fillremaining">(Missing)</td>
        <td class="number">263</td>
        <td class="number">20.1%</td>
        <td>
            <div class="bar" style="width:39%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12"  id="extreme4581289135072909039">
            <p class="h4">Minimum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0.1667</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:34%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">0.3333</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:34%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">0.4167</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:34%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">0.6667</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:34%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">0.75</td>
        <td class="number">3</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
            <p class="h4">Maximum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">70.5</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:50%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">71.0</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">74.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:50%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">76.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:50%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">80.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:50%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
    </div>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_boat">boat<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="">
            <th>Distinct count</th>
            <td>29</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>2.2%</td>
        </tr>
        <tr class="alert">
            <th>Missing (%)</th>
            <td>62.9%</td>
        </tr>
        <tr class="alert">
            <th>Missing (n)</th>
            <td>823</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable-4263283471668388709">
    <table class="mini freq">
        <tr class="">
    <th>13</th>
    <td>
        <div class="bar" style="width:5%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 3.0%">
            &nbsp;
        </div>
        39
    </td>
</tr><tr class="">
    <th>C</th>
    <td>
        <div class="bar" style="width:5%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 2.9%">
            &nbsp;
        </div>
        38
    </td>
</tr><tr class="">
    <th>15</th>
    <td>
        <div class="bar" style="width:5%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 2.8%">
            &nbsp;
        </div>
        37
    </td>
</tr><tr class="other">
    <th>Other values (25)</th>
    <td>
        <div class="bar" style="width:45%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 28.4%">
            372
        </div>

    </td>
</tr><tr class="missing">
    <th>(Missing)</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 62.9%">
            823
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable-4263283471668388709, #minifreqtable-4263283471668388709"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable-4263283471668388709">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">13</td>
        <td class="number">39</td>
        <td class="number">3.0%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">C</td>
        <td class="number">38</td>
        <td class="number">2.9%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">15</td>
        <td class="number">37</td>
        <td class="number">2.8%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">14</td>
        <td class="number">33</td>
        <td class="number">2.5%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">31</td>
        <td class="number">2.4%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">10</td>
        <td class="number">29</td>
        <td class="number">2.2%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">5</td>
        <td class="number">27</td>
        <td class="number">2.1%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">26</td>
        <td class="number">2.0%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">9</td>
        <td class="number">25</td>
        <td class="number">1.9%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">11</td>
        <td class="number">25</td>
        <td class="number">1.9%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (18)</td>
        <td class="number">176</td>
        <td class="number">13.4%</td>
        <td>
            <div class="bar" style="width:22%">&nbsp;</div>
        </td>
</tr><tr class="missing">
        <td class="fillremaining">(Missing)</td>
        <td class="number">823</td>
        <td class="number">62.9%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_body">body<br/>
            <small>Numeric</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Distinct count</th>
                    <td>122</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>9.3%</td>
                </tr>
                <tr class="alert">
                    <th>Missing (%)</th>
                    <td>90.8%</td>
                </tr>
                <tr class="alert">
                    <th>Missing (n)</th>
                    <td>1188</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (n)</th>
                    <td>0</td>
                </tr>
            </table>

        </div>
        <div class="col-sm-6">
            <table class="stats ">

                <tr>
                    <th>Mean</th>
                    <td>160.81</td>
                </tr>
                <tr>
                    <th>Minimum</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th>Maximum</th>
                    <td>328</td>
                </tr>
                <tr class="ignore">
                    <th>Zeros (%)</th>
                    <td>0.0%</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minihistogram-6722867098104776931">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAAS5JREFUeJzt2tFJBDEUQNGsWJJF2JPf9mQR21P8FuTiLsxONp7zPxAClxcec5lzzgH86uXsA8DKXs8%2BAD%2B9fXzd/M318/2AkzCGCQJJIBAEAkEgEAQCYYstls0PRzFBIAgEwhZPrHvc8yy71U7PuEfc1xjr3ZkJAkEgEJZ7Yj1qlP9n7vjvTBAIAoEgEAgCgSAQCMttsXZiW/T8TBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAI/ubdgL%2BGj2OCQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIhMucc559CFiVCQJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBALhGyzqGjWSaoRBAAAAAElFTkSuQmCC">

</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#descriptives-6722867098104776931,#minihistogram-6722867098104776931"
       aria-expanded="false" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="row collapse col-md-12" id="descriptives-6722867098104776931">
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#quantiles-6722867098104776931"
                                                  aria-controls="quantiles-6722867098104776931" role="tab"
                                                  data-toggle="tab">Statistics</a></li>
        <li role="presentation"><a href="#histogram-6722867098104776931" aria-controls="histogram-6722867098104776931"
                                   role="tab" data-toggle="tab">Histogram</a></li>
        <li role="presentation"><a href="#common-6722867098104776931" aria-controls="common-6722867098104776931"
                                   role="tab" data-toggle="tab">Common Values</a></li>
        <li role="presentation"><a href="#extreme-6722867098104776931" aria-controls="extreme-6722867098104776931"
                                   role="tab" data-toggle="tab">Extreme Values</a></li>

    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active row" id="quantiles-6722867098104776931">
            <div class="col-md-4 col-md-offset-1">
                <p class="h4">Quantile statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Minimum</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>5-th percentile</th>
                        <td>16</td>
                    </tr>
                    <tr>
                        <th>Q1</th>
                        <td>72</td>
                    </tr>
                    <tr>
                        <th>Median</th>
                        <td>155</td>
                    </tr>
                    <tr>
                        <th>Q3</th>
                        <td>256</td>
                    </tr>
                    <tr>
                        <th>95-th percentile</th>
                        <td>307</td>
                    </tr>
                    <tr>
                        <th>Maximum</th>
                        <td>328</td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td>327</td>
                    </tr>
                    <tr>
                        <th>Interquartile range</th>
                        <td>184</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4 col-md-offset-2">
                <p class="h4">Descriptive statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Standard deviation</th>
                        <td>97.697</td>
                    </tr>
                    <tr>
                        <th>Coef of variation</th>
                        <td>0.60753</td>
                    </tr>
                    <tr>
                        <th>Kurtosis</th>
                        <td>-1.2541</td>
                    </tr>
                    <tr>
                        <th>Mean</th>
                        <td>160.81</td>
                    </tr>
                    <tr>
                        <th>MAD</th>
                        <td>84.169</td>
                    </tr>
                    <tr class="">
                        <th>Skewness</th>
                        <td>0.091739</td>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>19458</td>
                    </tr>
                    <tr>
                        <th>Variance</th>
                        <td>9544.7</td>
                    </tr>
                    <tr>
                        <th>Memory size</th>
                        <td>10.3 KiB</td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane col-md-8 col-md-offset-2" id="histogram-6722867098104776931">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzt3Xt8VOWdx/FvkjGBkAwk6sA2IqAUVkgQFIxG5BK5KYKAYKR1kVYU3EA0BQURF6gK7ELWtYTSgoKCXc2SsoIRgUUFgbJWtMhwkdUIW8iCmUJiSAyXJGf/4EXC5MbtIYcz83m/XrxinjPnyW9%2Bnnnmm3NmJiGWZVkCAACAMaF2FwAAABBoCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDCX3QUEC5/vuLG5QkNDFBvbRMeOlaiiwjI2rxPRiyr0ogq9OIM%2BVKEXVYKtF9dfH23Lz%2BUMlgOFhoYoJCREoaEhdpdiO3pRhV5UoRdn0Icq9KIKvWgYBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAw4I2YG3evFlJSUlKT0%2Bvse3777/XU089pc6dOyspKUkZGRmqqKiwoUoAAOBEQRmwFi9erJdfflmtWrWqsc2yLI0fP15xcXHasmWLli9frm3btumzzz6zoVIAAOBEQfnHniMiIpSdna1XXnlFJ0%2Be9Nv2%2Beef6%2BDBg/rDH/6g8PBwRUVFKTs726ZKAQCAEwVlwBo1alSd27744gu1a9dOr776qlauXKmoqCj9/Oc/1y9/%2BcsLnj8/P18%2Bn89vzOWKlMfjueSazxUWFur3NZjRiyr0ogq9OIM%2BVKEXVehFwwjKgFWfI0eOaMeOHerRo4c2btyoP//5zxo/frxuvPFG9enT54LmyMrKUmZmpt9Yamqq0tLSjNbqdjc2Op%2BT0Ysq9KKKqV50fWGtkXkayvZXBvh9zzFRhV5UoRdXFgGrGsuyFBsbqzFjxkiSevbsqb59%2B%2BrDDz%2B84ICVkpKi5ORkvzGXK1IFBSVGagwLC5Xb3VhFRaUqLw/uF9/Tiyr0okqw9%2BLsWhPsfTgXvagSbL2IiWliy88lYFVz/fXXKzo62m8sLi5OX3311QXP4fF4alwO9PmOq6zM7IFcXl5hfE6nohdV6EWVYO1F9fscrH2oDb2oQi%2BuLC7AVnPzzTfr4MGDKimpOtuUl5enuLg4G6sCAABOQsCqJjk5WW63W//yL/%2BiH3/8Udu2bdOGDRs0bNgwu0sDAAAOEZSXCBMSEiRJZWVlkqQNGzZIkrxerxo1aqTXX39d06dP15133qnY2FjNnDlT3bp1s61eAADgLEEZsLxeb73b27Vrp3feeaeBqgEAAIGGS4QAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYFrQBa/PmzUpKSlJ6enqdtykpKVGvXr00ZcqUBqwMAAA4ncvuAuywePFiZWdnq1WrVvXebv78%2BSouLm6gqgAAQKAIyjNYERER5w1YX3/9tXJycjR06NAGrAwAAASCoDyDNWrUqHq3W5alGTNmKD09Xf/3f/%2Bn48ePX9T8%2Bfn58vl8fmMuV6Q8Hs9F11qbsLBQv6/BjF5UoRdVgr0XLpf//Q/WPpyLXlShFw0jKAPW%2BWRlZSkkJETDhg1TZmbmJe1ffb/U1FSlpaWZKlGS5HY3Njrfldb1hbV2l3BRtr8ywO4SLonTjosrKVh7ERPTxO/7YO1DbehFFXpxZRGwqjl69Khee%2B01vfnmmwoJCbmkOVJSUpScnOw35nJFqqCgxESJCgsLldvdWEVFpSovrzAyJ2oy9f%2BroXBcVAn2Xpw9doO9D%2BeiF1WCrRfVf%2BFoKASsaubMmaMhQ4aoffv2lzyHx%2BOpcTnQ5zuusjKzB3J5eYXxOVHFqb3luKgSrL2ofp%2BDtQ%2B1oRdV6MWVRcCqZvXq1XK73Vq5cqUk6cSJE6qoqNAnn3yizz77zObqAACAExCwqtm0aZPf90uXLtWRI0f0/PPP21QRAABwmqAMWAkJCZKksrIySdKGDRskSV6vVy1atPC7bVRUlBo3blxjHAAAoC5BGbC8Xu8F33bChAlXsBIAABCI%2BBAMAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABgWlH/sGbgQ9/3bVrtLCFgfPnO33SUAl4R14coJtHWBM1gAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwLCgDVibN29WUlKS0tPTa2xbv369Bg8erC5duqh///76j//4DxsqBAAATuWyuwA7LF68WNnZ2WrVqlWNbTt37tSkSZP0r//6r%2BrVq5e2bt2q1NRU3XTTTeratasN1QIAAKcJyjNYERERdQaswsJCjR07Vn369JHL5VLPnj3Vrl07bd%2B%2B3YZKAQCAEwXlGaxRo0bVua1Hjx7q0aNH5fdlZWXy%2BXxq3rz5Bc%2Bfn58vn8/nN%2BZyRcrj8Vx8sbUICwv1%2Bwo4jct1ZY/dYH%2BMnO1vsPfhXPTi6nel14WGFpQB62LMmzdPkZGRuv/%2B%2By94n6ysLGVmZvqNpaamKi0tzWhtbndjdX1hrdE5gYYQE9OkQX6O2924QX7O1aZ6f6/mPrCG4ayGWhcaCgGrDpZlad68ecrJydGyZcsUERFxwfumpKQoOTnZb8zlilRBQYmR2sLCQuV2N1ZRUamR%2BYCGZuqxUJdzHyPl5RVX9Gddjc72N9j7AGe5UuuCXcGNgFWLiooKPf/889q5c6feeecdtWzZ8qL293g8NS4H%2BnzHVVZmdoFjwYRTmX4s1KW8vKLBftbVpPp9DtY%2BwFkC7RglYNVi1qxZ%2Buabb/TOO%2B%2BoWbNmdpcDAAAchoBVzRdffKHVq1drzZo1hCsAAHBJgjJgJSQkSDrzDkFJ2rBhgyTJ6/Xqj3/8o44fP67evXv77dOtWzctWbKkYQsFAACOFJQBy%2Bv11rlt1qxZmjVrVgNWAwAAAk1gfegEAADAVYCABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwLCgDVibN29WUlKS0tPTa2xbs2aNBg0apC5dumjYsGHasmWLDRUCAACnctldgB0WL16s7OxstWrVqsa2vXv3avLkycrMzNSdd96pdevWafz48Vq7dq1atGhhQ7UAAMBpHHcGKzk5WZmZmTp8%2BPAlzxEREVFnwFqxYoV69uypnj17KiIiQoMHD1a7du20evXqyykbAAAEEccFrIceekhr1qxRnz59NGbMGK1fv15lZWUXNceoUaMUHR1d67bdu3erQ4cOfmMdOnSQ1%2Bu95JoBAEBwcdwlwtTUVKWmpmr37t3KycnRrFmzNHPmTA0ZMkTDhw9XmzZtLmv%2BwsJCNW3a1G%2BsadOm%2Bvbbby94jvz8fPl8Pr8xlytSHo/nsmo7Kyws1O8r4DQu15U9doP9MXK2v8HeBzjLlV4XGprjAtZZHTt2VMeOHfXcc89pzZo1mjFjhpYsWaKkpCQ9/fTT6tSp0yXPbVnWZdWWlZWlzMxMv7HU1FSlpaVd1rzVud2Njc4HNJS%2B8zbbXUJAi4lp4vc9awWcoPpx63SODVinT5/Wf/3Xf2nlypX67//%2Bb7Vu3VoTJkxQfn6%2BRo8erZkzZ2rQoEEXPW9MTIwKCwv9xgoLCxUbG3vBc6SkpCg5OdlvzOWKVEFByUXXU5uwsFC53Y1VVFRqZD4AgeXsWnPuWlFeXmFzVUD9TD1HVmdXcHNcwMrNzVV2drbee%2B89lZSUqH///nrrrbd0%2B%2B23V96mW7dumjFjxiUFrPj4eO3atctvzOv1auDAgRc8h8fjqXE50Oc7rrIyswscCyaA2lRfa8rLK4yvP4BpgXaMOi5gDRw4UG3atNHYsWM1ZMgQNWvWrMZtevbsqWPHjl3S/A8//LCGDx%2BujRs36q677tL777%2BvAwcOaPDgwZdbOgAACBKOC1jLli3THXfccd7bffXVV3VuS0hIkKTKdx9u2LBB0pkzVe3atdO8efM0e/Zs5eXlqW3btvr973%2Bv66%2B/3kD1AAAgGDguYLVv317jxo3T8OHD1adPH0nSm2%2B%2Bqa1bt2ru3Lm1ntGq7nwfudCvXz/169fPSL0AACD4OO49kbNnz9bx48fVtm3byrFevXqpoqJCc%2BbMsbEyAACAMxx3BmvLli16//33FRMTUznWunVrzZs3Tw888ICNlQEAAJzhuDNYJ06cUERERI3x0NBQlZbysQUAAMB%2BjgtY3bp105w5c/TDDz9Ujn3//feaOXOm30c1AAAA2MVxlwinTp2qX/7yl7rrrrsUFRWliooKlZSUqGXLllq%2BfLnd5QEAADgvYLVs2VIffPCBPv30U/31r39VaGio2rRpo%2B7duyssLMzu8gAAAJwXsCQpPDy88iMaAAAArjaOC1gHDx5URkaGvvnmG504caLG9o8%2B%2BsiGqgAAAKo4LmBNnTpV%2Bfn56t69uyIjI%2B0uBwAAoAbHBaxdu3bpo48%2BUmxsrN2lAAAA1MpxH9Nw7bXXcuYKAABc1RwXsMaOHavMzExZlmV3KQAAALVy3CXCTz/9VF9%2B%2BaVWrlypG264QaGh/hnx3XfftakyAACAMxwXsKKiotSjRw%2B7ywAAAKiT4wLW7Nmz7S4BAACgXo57DZYkfffdd5o/f76ef/75yrG//OUvNlYEAABQxXEBa9u2bRo8eLDWr1%2BvnJwcSWc%2BfHTUqFF8yCgAALgqOC5gvfrqq3r22Wf1/vvvKyQkRNKZv084Z84cLViwwObqAAAAHBiw/ud//kcjR46UpMqAJUkDBgxQbm6uXWUBAABUclzAio6OrvVvEObn5ys8PNyGigAAAPw5LmDddtttmjVrloqLiyvH9u/fr8mTJ%2Buuu%2B6ysTIAAIAzHPcxDc8//7wee%2BwxJSYmqry8XLfddptKS0v105/%2BVHPmzLG7PAAAAOcFrBYtWignJ0ebNm3S/v371ahRI7Vp00Z3332332uyAAAA7OK4gCVJ11xzjfr06WN3GQAAALVyXMBKTk6u90wVn4UFAADs5riAdf/99/sFrPLycu3fv19er1ePPfaYjZUBAACc4biANWnSpFrH161bp88%2B%2B6yBqwEAAKjJcR/TUJc%2Bffrogw8%2BMDLXnj17NGrUKHXt2lV33323Jk2apGPHjhmZGwAABL6ACVh79uyRZVmXPU9ZWZmefPJJde7cWX/605%2BUk5OjY8eOacaMGZdfJAAACAqOu0T4yCOP1BgrLS1Vbm6u%2BvXrd9nz%2B3w%2B%2BXw%2BPfjggwoPD1d4eLj69u2rJUuWXPbcAAAgODguYLVu3brGuwgjIiI0fPhwjRgx4rLnb968uW655RZlZWXp6aef1okTJ7R%2B/Xr16tXrsucGAADBwXEB60p/WntoaKjmz5%2Bv0aNH66233pIk3XHHHZo4ceIFz5Gfny%2Bfz%2Bc35nJFyuPxGKkxLCzU7ysAnMvl8l8jWCvgBGeP20DhuID13nvvXfBthwwZctHznzp1SuPGjdOAAQM0btw4/fjjj5o5c6YmTZqkzMzMC5ojKyurxm1TU1OVlpZ20fXUx%2B1ubHQ%2BAIEhJqaJ3/esFXCC6set0zkuYL3wwguqqKio8YL2kJAQv7GQkJBLCljbtm3ToUOH9Ktf/UphYWGKjo5WWlqaHnzwQRUWFqpZs2bnnSMlJUXJycl%2BYy5XpAoKSi66ntqEhYXK7W6soqJSI/MBCCxn15pz14ry8gqbqwLqZ%2Bo5sjq7gpvjAtbrr7%2BuJUuWaNy4cWrfvr0sy9K%2Bffu0ePFiPfroo0pMTLys%2BcvLy2sEuFOnTl3UHB6Pp8blQJ/vuMrKzC5wLJgAalN9rSkvrzC%2B/gCmBdox6riANWfOHC1atEjNmzevHOvatatatmypxx9/XDk5OZc1f5cuXRQZGan58%2Bdr3LhxOnHihBYuXKhu3bpd0NkrAAAAx72i7MCBA2ratGmNcbfbrby8vMuePyYmRm%2B88Ya%2B/PJL9ejRQw888IAaNWqkjIyMy54bAAAEB8edwYqLi9OcOXP09NNPKyYmRpJUVFSk3/zmN7rxxhuN/Iz4%2BHgtX77cyFwAACD4OC5gTZ06VRMnTlRWVpaaNGmi0NBQFRcXq1GjRlqwYIHd5QEAADgvYHXv3l0bN27Upk2bdOTIEVmWpebNm%2Buee%2B5RdHS03eUBAAA4L2BJUuPGjXXvvffqyJEjatmypd3lAAAA%2BHHci9xPnDihyZMnq0uXLrrvvvsknXkN1pgxY1RUVGRzdQAAAA4MWHPnztXevXs1b948hYZWlV9eXq558%2BbZWBkAAMAZjgtY69at029%2B8xsNGDCg8o8%2Bu91uzZ49W%2BvXr7e5OgAAAAcGrJKSErVu3brGeGxsrH788ceGLwgAAKAaxwWsG2%2B8UZ999pkk%2Bf05m7Vr1%2BonP/mJXWUBAABUcty7CH/2s59pwoQJeuihh1RRUaGlS5dq165dWrdunV544QW7ywMAAHBewEpJSZHL5dLbb7%2BtsLAw/e53v1ObNm00b948DRgwwO7yAAAAnBewjh07poceekgPPfSQ3aUAAADUynGvwbr33nv9XnsFAABwtXFcwEpMTNSHH35odxkAAAB1ctwlwr/7u7/TK6%2B8okWLFunGG2/UNddc47c9IyPDpsoAAADOcFzA%2Bvbbb3XTTTdJkgoKCmyuBgAAoCbHBKz09HS9%2BuqrWr58eeXYggULlJqaamNVAAAANTnmNVgff/xxjbFFixbZUAkAAED9HBOwanvnIO8mBAAAVyPHBKyzf9j5fGMAAAB2c0zAAgAAcAoCFgAAgGGOeRfh6dOnNXHixPOO8TlYAADAbo4JWLfffrvy8/PPOwYAAGA3xwSscz//CgAA4GrGa7AAAAAMI2ABAAAYRsACAAAwjIBVh4ULF6p79%2B7q3LmzRo8erUOHDtldEgAAcAgCVi3%2B8Ic/aPXq1Vq2bJm2bNmitm3b6s0337S7LAAA4BCOeRdhQ1qyZIkmT56sm266SZI0bdo0mysCAABOwhmsar7//nsdOnRIP/zwg%2B6//34lJiYqLS1Nx44ds7s0AADgEJzBqubIkSOSpLVr12rp0qWyLEtpaWmaNm2afvvb317QHPn5%2BfL5fH5jLlekPB6PkRrDwkL9vgLAuVwu/zWCtQJOcPa4DRQErGosy5IkjRkzRs2bN5ckTZgwQU888YROnjypiIiI886RlZWlzMxMv7HU1FSlpaUZrdXtbmx0PgCBISamid/3rBVwgurHrdMRsKq57rrrJElut7tyLC4uTpZl6ejRo/rJT35y3jlSUlKUnJzsN%2BZyRaqgoMRIjWFhoXK7G6uoqNTIfAACy9m15ty1ory8wuaqgPqZeo6szq7gRsCqpkWLFoqKitLevXvVsWNHSVJeXp6uueaaC77E5/F4atzW5zuusjKzCxwLJoDaVF9ryssrjK8/gGmBdowG1gVPA1wul4YPH67f/e53%2Bt///V8dPXpUCxYs0KBBg%2BRykUcBAMD5kRhqMXHiRJ06dUojRozQ6dOn1b9/fz6qAQAAXDACVi3Cw8M1ffp0TZ8%2B3e5SAACAA3GJEAAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMc9ldAADArPv%2BbavdJQBBjzNYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAes8Zs2apfbt29tdBgAAcBACVj327t2rVatW2V0GAABwGAJWHSoqKjR9%2BnSNHj3a7lIAAIDDELDq8O677yoiIkKDBg2yuxQAAOAwLrsLuBr97W9/0/z587V8%2BfJL2j8/P18%2Bn89vzOWKlMfjMVGewsJC/b4CAOB0LldgPacRsGoxe/ZsDRs2TG3bttWhQ4cuev%2BsrCxlZmb6jaWmpiotLc1UiZIkt7ux0fkAALBLTEwTu0swioBVzbZt2/SXv/xFOTk5lzxHSkqKkpOT/cZcrkgVFJRcbnmSzpy5crsbq6io1Mh8AADYzdRzZHV2BTcCVjWrV6/W0aNH1bt3b0mSZVmSpMTERP3TP/2TBg4ceN45PB5PjcuBPt9xlZVVGK21vNzsfAAA2MX0c6TdCFjVTJkyRU8//XTl90eOHFFKSopWrVqlpk2b2lgZAABwCgJWNU2bNvULUmVlZZKkFi1a2FUSAABwmMB6yf4VcMMNN2jfvn12lwEAAByEgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBKxa5OXlKTU1VYmJiUpKStKUKVNUVFRkd1kAAMAhCFi1GDdunNxutz7%2B%2BGOtXLlS33zzjf75n//Z7rIAAIBDELCqKSoqUnx8vCZOnKgmTZqoRYsWGjp0qLZv3253aQAAwCFcdhdwtXG73Zo9e7bf2OHDh%2BXxeGyqCAAAOA0B6zy8Xq/efvttLVy48IL3yc/Pl8/n8xtzuSKNhbSwsFC/rwAAOJ3LFVjPaQSsenzxxRd66qmnNHHiRCUlJV3wfllZWcrMzPQbS01NVVpamtH63O7GRucDAMAuMTFN7C7BKAJWHT7%2B%2BGM9%2B%2ByzevHFFzVkyJCL2jclJUXJycl%2BYy5XpAoKSozUFhYWKre7sYqKSo3MBwCA3Uw9R1ZnV3AjYNXiyy%2B/1OTJk/Xaa6%2Bpe/fuF72/x%2BOpcTnQ5zuusrIKUyVKksrLzc4HAIBdTD9H2i2wLngaUFZWpmnTpmnSpEmXFK4AAAAIWNXs2LFDubm5evnll5WQkOD3Ly8vz%2B7yAACAA3CJsJquXbtq3759dpcBAAAcjDNYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyABQAAYBgBCwAAwDACFgAAgGEELAAAAMMIWAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABgGAELAADAMAIWAACAYQQsAAAAwwhYAAAAhhGwAAAADCNgAQAAGEbAAgAAMIyAVYu8vDw9%2BeSTSkxMVO/evTV37lxVVFTYXRYAAHAIl90FXI0mTJigjh07asOGDTp69KjGjh2r6667Tr/4xS/sLg0AADgAZ7Cq8Xq9%2BvrrrzVp0iRFR0erdevWGj16tLKysuwuDQAAOARnsKrZvXu34uLi1LRp08qxjh07av/%2B/SouLlZUVNR558jPz5fP5/Mbc7ki5fF4jNQYFhbq9xUAAKdzuQLrOY2AVU1hYaHcbrff2NmwVVBQcEEBKysrS5mZmX5j48eP14QJE4zUmJ%2Bfr7feel0pKSna/soAI3M6VX5%2BvrKyspSSkmIswDoVvahCL86gD1XoRRV60TACKy4aYlnWZe2fkpKilStX%2Bv1LSUkxVJ3k8/mUmZlZ4yxZMKIXVehFFXpxBn2oQi%2Bq0IuGwRmsamJjY1VYWOg3VlhYqJCQEMXGxl7QHB6Ph98KAAAIYpzBqiY%2BPl6HDx/WsWPHKse8Xq/atm2rJk2a2FgZAABwCgJWNR06dFBCQoIyMjJUXFys3NxcLV26VCNHjrS7NAAA4BBhM2bMmGF3EVebe%2B65Rzk5OXrppZf0wQcfaPjw4Xr88ccVEhJid2mVmjRpojvuuIOzaqIX56IXVejFGfShCr2oQi%2BuvBDrcl/RDQAAAD9cIgQAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIDlMHl5eXryySeVmJio3r17a%2B7cuaqoqLC7rAbRvn17xcfHKyEhofLfSy%2B9JEnatm2bhg8frttuu00DBw7U6tWrba7WrM2bNyspKUnp6ek1tq1Zs0aDBg1Sly5dNGzYMG3ZsqVyW0VFhV599VXde%2B%2B96tatmx5//HEdPHiwIUs3rq5erFy5Un//93/vd3wkJCRo586dkgKvF3l5eUpNTVViYqKSkpI0ZcoUFRUVSZL27t2rRx99VLfffrv69eunJUuW%2BO1b3zHjRHX14tChQ2rfvn2NY%2BKNN96o3DfQevH111/rscce0%2B23366kpCQ988wz8vl8ks6/Ti5btkz9%2B/fXbbfdppEjR2rXrl123IXUJ4uMAAAIz0lEQVTAYcFRhg4dak2bNs0qKiqy9u/fb/Xr189asmSJ3WU1iHbt2lkHDx6sMf79999bnTt3tlasWGGdOHHC2rp1q9WpUydr586dNlRp3qJFi6x%2B/fpZjzzyiPXMM8/4bduzZ48VHx9vbdy40Tpx4oS1atUq69Zbb7UOHz5sWZZlLVu2zOrdu7f17bffWsePH7d%2B/etfW4MGDbIqKirsuCuXrb5e/PGPf7QeffTROvcNtF488MAD1pQpU6zi4mLr8OHD1rBhw6ypU6dapaWl1j333GPNnz/fKikpsXbt2mXdcccd1rp16yzLOv8x40R19eLgwYNWu3bt6twv0Hpx8uRJ66677rIyMzOtkydPWkePHrUeffRR6x//8R/Pu05%2B9NFHVteuXa0dO3ZYpaWl1u9//3vr7rvvtkpKSmy%2BV87FGSwH8Xq9%2BvrrrzVp0iRFR0erdevWGj16tLKysuwuzVbvv/%2B%2BWrdureHDhysiIkJJSUlKTk7WihUr7C7NiIiICGVnZ6tVq1Y1tq1YsUI9e/ZUz549FRERocGDB6tdu3aVv5lmZWVp9OjRuvnmmxUVFaX09HTl5ubqq6%2B%2Baui7YUR9vTifQOpFUVGR4uPjNXHiRDVp0kQtWrTQ0KFDtX37dm3cuFGnT5/WU089pcjISHXs2FEjRoyoXCfOd8w4TX29OJ9A60VpaanS09M1duxYhYeHKzY2Vn379tU333xz3nUyKytLw4YN06233qpGjRppzJgxkqRPPvnEzrvkaAQsB9m9e7fi4uLUtGnTyrGOHTtq//79Ki4utrGyhpORkaFevXqpa9euevHFF1VSUqLdu3erQ4cOfrfr0KFDwJzeHjVqlKKjo2vdVtd993q9OnHihL799lu/7VFRUWrVqpW8Xu8VrflKqa8XknT48GH94he/ULdu3XTvvfdq1apVkhRwvXC73Zo9e7auu%2B66yrHDhw/L4/Fo9%2B7dat%2B%2BvcLCwiq3nft4qO%2BYcaL6enHWc889p%2B7du%2BvOO%2B9URkaGTp8%2BLSnwetG0aVONGDFCLpdLkvTdd9/pP//zP3Xfffedd52svj00NFS33HKLY3txNSBgOUhhYaHcbrff2NmwVVBQYEdJDapz585KSkrS%2BvXrlZWVpR07dmjmzJm19qVZs2ZB0ZPCwkK/wC2dOSYKCgr0ww8/yLKsOrcHmtjYWLVu3VrPPvustm7dql/96leaOnWqtm3bFvC98Hq9evvtt/XUU0/V%2BXgoLCxURUVFvcdMIDi3F%2BHh4erSpYv69u2rTz75RIsWLdLq1av129/%2BVlL9jx8ny8vLU3x8vO6//34lJCQoLS3tvOtkoPbCTgQsh7Esy%2B4SbJOVlaURI0YoPDxcN998syZNmqScnJzK30aD1fmOiWA5Znr16qXXX39dHTp0UHh4uAYOHKi%2Bfftq5cqVlbcJxF588cUXevzxxzVx4kQlJSXVebuQkJDK/w7EPkg1e%2BHxePTuu%2B%2Bqb9%2B%2Buuaaa9SpUyeNHTs24I%2BJuLg4eb1erV27VgcOHNBzzz13QfsFYi/sRMBykNjYWBUWFvqNFRYWKiQkRLGxsTZVZZ8bbrhB5eXlCg0NrdGXgoKCoOhJTExMrcdEbGysmjVrVmtvCgsLde211zZkmbaJi4tTfn5%2BwPbi448/1pNPPqmpU6dq1KhRks6sE9XPOhQWFlb2oL5jxslq60Vt4uLi9Le//U2WZQVsL6Qzgbp169ZKT09XTk6OXC5XvetkIPfCLgQsB4mPj9fhw4d17NixyjGv16u2bduqSZMmNlZ25e3Zs0dz5szxG8vNzVV4eLh69uxZ4/VWu3bt0q233tqQJdoiPj6%2Bxn33er269dZbFRERoZ/%2B9KfavXt35baioiL99a9/VadOnRq61CvunXfe0Zo1a/zGcnNz1bJly4DsxZdffqnJkyfrtdde05AhQyrH4%2BPjtW/fPpWVlVWOnT0mzm6v65hxqrp6sW3bNi1cuNDvtt99953i4uIUEhIScL3Ytm2b%2Bvfv7/fRPaGhZ57mO3XqVO86GR8f7/f4KC8v1549exzbi6sBActBOnTooISEBGVkZKi4uFi5ublaunSpRo4caXdpV9y1116rrKwsLVq0SKdOndL%2B/fv12muvKSUlRQ8%2B%2BKDy8vK0YsUKnTx5Ups2bdKmTZv08MMP2132Fffwww/rT3/6kzZu3KiTJ08qOztbBw4c0ODBgyVJI0eO1LJly5Sbm6vi4mLNmzdPt9xyixISEmyu3LxTp07ppZdektfr1enTp5WTk6NPP/1UjzzyiKTA6kVZWZmmTZumSZMmqXv37n7bevbsqaioKC1cuFClpaX66quvlJ2dXblOnO%2BYcZr6ehEdHa0FCxZo1apVOn36tLxer954442A7UV8fLyKi4s1d%2B5clZaW6tixY5o/f766du2qkSNH1rtOjhw5Uu%2B995527Nih0tJSLVy4UOHh4erVq5e9d8rBQiwuujrKkSNH9OKLL%2BrPf/6zoqKi9Mgjj2j8%2BPF%2Br68IVJ9//rkyMjK0b98%2BhYeHa%2BjQoUpPT1dERIQ%2B//xzvfzyy8rNzVVcXJwmTpyofv362V2yEWcDwNkzEmffIXT23T3r169XRkaG8vLy1LZtW73wwgvq1q2bpDOvqZg/f77effddlZSUKDExUb/%2B9a/VokULG%2B7J5auvF5ZlaeHChcrOzpbP59MNN9yg5557Tr1795YUWL3Yvn27fv7znys8PLzGtrVr16qkpETTp0/Xrl27dN111%2BmJJ57Qz372s8rb1HfMOM35erFnzx5lZmbqwIEDio6O1j/8wz/oiSeeqDyzE0i9kKR9%2B/bp5Zdf1s6dOxUZGak777xTU6ZMUfPmzc%2B7Tv77v/%2B7Fi1apKNHjyohIUEzZsxQu3btbLw3zkbAAgAAMIxLhAAAAIYRsAAAAAwjYAEAABhGwAIAADCMgAUAAGAYAQsAAMAwAhYAAIBhBCwAAADDCFgAAACGEbAAAAAMI2ABAAAYRsACAAAwjIAFAABg2P8DXjA0FYX7gOgAAAAASUVORK5CYII%3D"/>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12" id="common-6722867098104776931">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">142.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">68.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">47.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">98.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">188.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">120.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">156.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">37.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">58.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">70.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (111)</td>
        <td class="number">111</td>
        <td class="number">8.5%</td>
        <td>
            <div class="bar" style="width:10%">&nbsp;</div>
        </td>
</tr><tr class="missing">
        <td class="fillremaining">(Missing)</td>
        <td class="number">1188</td>
        <td class="number">90.8%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12"  id="extreme-6722867098104776931">
            <p class="h4">Minimum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">1.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">7.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">9.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">14.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
            <p class="h4">Maximum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">312.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">314.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">322.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">327.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">328.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
    </div>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_cabin">cabin<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="alert">
            <th>Distinct count</th>
            <td>187</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>14.3%</td>
        </tr>
        <tr class="alert">
            <th>Missing (%)</th>
            <td>77.5%</td>
        </tr>
        <tr class="alert">
            <th>Missing (n)</th>
            <td>1014</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable6688113341693915533">
    <table class="mini freq">
        <tr class="">
    <th>C23 C25 C27</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.5%">
            &nbsp;
        </div>
        6
    </td>
</tr><tr class="">
    <th>G6</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.4%">
            &nbsp;
        </div>
        5
    </td>
</tr><tr class="">
    <th>B57 B59 B63 B66</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.4%">
            &nbsp;
        </div>
        5
    </td>
</tr><tr class="other">
    <th>Other values (183)</th>
    <td>
        <div class="bar" style="width:28%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 21.3%">
            279
        </div>

    </td>
</tr><tr class="missing">
    <th>(Missing)</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 77.5%">
            1014
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable6688113341693915533, #minifreqtable6688113341693915533"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable6688113341693915533">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">C23 C25 C27</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">G6</td>
        <td class="number">5</td>
        <td class="number">0.4%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">B57 B59 B63 B66</td>
        <td class="number">5</td>
        <td class="number">0.4%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">F4</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">F33</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">F2</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">C22 C26</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">C78</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">B96 B98</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">D</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (176)</td>
        <td class="number">251</td>
        <td class="number">19.2%</td>
        <td>
            <div class="bar" style="width:25%">&nbsp;</div>
        </td>
</tr><tr class="missing">
        <td class="fillremaining">(Missing)</td>
        <td class="number">1014</td>
        <td class="number">77.5%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_embarked">embarked<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="">
            <th>Distinct count</th>
            <td>4</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>0.3%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (%)</th>
            <td>0.2%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (n)</th>
            <td>2</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable-5492184930412029605">
    <table class="mini freq">
        <tr class="">
    <th>S</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 69.8%">
            914
        </div>

    </td>
</tr><tr class="">
    <th>C</th>
    <td>
        <div class="bar" style="width:30%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 20.6%">
            270
        </div>

    </td>
</tr><tr class="">
    <th>Q</th>
    <td>
        <div class="bar" style="width:14%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 9.4%">
            &nbsp;
        </div>
        123
    </td>
</tr><tr class="missing">
    <th>(Missing)</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.2%">
            &nbsp;
        </div>
        2
    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable-5492184930412029605, #minifreqtable-5492184930412029605"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable-5492184930412029605">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">S</td>
        <td class="number">914</td>
        <td class="number">69.8%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">C</td>
        <td class="number">270</td>
        <td class="number">20.6%</td>
        <td>
            <div class="bar" style="width:30%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Q</td>
        <td class="number">123</td>
        <td class="number">9.4%</td>
        <td>
            <div class="bar" style="width:14%">&nbsp;</div>
        </td>
</tr><tr class="missing">
        <td class="fillremaining">(Missing)</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_fare">fare<br/>
            <small>Numeric</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Distinct count</th>
                    <td>282</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>21.5%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (%)</th>
                    <td>0.1%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (n)</th>
                    <td>1</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (n)</th>
                    <td>0</td>
                </tr>
            </table>

        </div>
        <div class="col-sm-6">
            <table class="stats ">

                <tr>
                    <th>Mean</th>
                    <td>33.295</td>
                </tr>
                <tr>
                    <th>Minimum</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Maximum</th>
                    <td>512.33</td>
                </tr>
                <tr class="alert">
                    <th>Zeros (%)</th>
                    <td>1.3%</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minihistogram-1641287166913019484">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAARNJREFUeJzt3bEJAkEQQFEVS7IIezK2J4uwpzUX%2BejCeYe%2Bly9M8hkm2v0YY%2ByAlw5rDwBbdlx7gGeny%2B3jN/freYFJwAaBJBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoGwuX/SZ/hbnaXYIBAEAkEgEAQC4SeO9BkOe97xt4F8w0yEM4S7nP0YY6w9BGyVGwSCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCATCA5JpFJU50JYtAAAAAElFTkSuQmCC">

</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#descriptives-1641287166913019484,#minihistogram-1641287166913019484"
       aria-expanded="false" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="row collapse col-md-12" id="descriptives-1641287166913019484">
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#quantiles-1641287166913019484"
                                                  aria-controls="quantiles-1641287166913019484" role="tab"
                                                  data-toggle="tab">Statistics</a></li>
        <li role="presentation"><a href="#histogram-1641287166913019484" aria-controls="histogram-1641287166913019484"
                                   role="tab" data-toggle="tab">Histogram</a></li>
        <li role="presentation"><a href="#common-1641287166913019484" aria-controls="common-1641287166913019484"
                                   role="tab" data-toggle="tab">Common Values</a></li>
        <li role="presentation"><a href="#extreme-1641287166913019484" aria-controls="extreme-1641287166913019484"
                                   role="tab" data-toggle="tab">Extreme Values</a></li>

    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active row" id="quantiles-1641287166913019484">
            <div class="col-md-4 col-md-offset-1">
                <p class="h4">Quantile statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Minimum</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>5-th percentile</th>
                        <td>7.225</td>
                    </tr>
                    <tr>
                        <th>Q1</th>
                        <td>7.8958</td>
                    </tr>
                    <tr>
                        <th>Median</th>
                        <td>14.454</td>
                    </tr>
                    <tr>
                        <th>Q3</th>
                        <td>31.275</td>
                    </tr>
                    <tr>
                        <th>95-th percentile</th>
                        <td>133.65</td>
                    </tr>
                    <tr>
                        <th>Maximum</th>
                        <td>512.33</td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td>512.33</td>
                    </tr>
                    <tr>
                        <th>Interquartile range</th>
                        <td>23.379</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4 col-md-offset-2">
                <p class="h4">Descriptive statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Standard deviation</th>
                        <td>51.759</td>
                    </tr>
                    <tr>
                        <th>Coef of variation</th>
                        <td>1.5545</td>
                    </tr>
                    <tr>
                        <th>Kurtosis</th>
                        <td>27.028</td>
                    </tr>
                    <tr>
                        <th>Mean</th>
                        <td>33.295</td>
                    </tr>
                    <tr>
                        <th>MAD</th>
                        <td>29.799</td>
                    </tr>
                    <tr class="">
                        <th>Skewness</th>
                        <td>4.3677</td>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>43550</td>
                    </tr>
                    <tr>
                        <th>Variance</th>
                        <td>2679</td>
                    </tr>
                    <tr>
                        <th>Memory size</th>
                        <td>10.3 KiB</td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane col-md-8 col-md-offset-2" id="histogram-1641287166913019484">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzt3Xt01PWd//FXkjGJEHJDA128hAoBQiDcUyMSCAoKghrCJRwWswsKEmVB6GK5HKRSwgocVMJB0i5WCrvGUJebIPyUS6WkdVuBTsJl5bZiNpgIGcMlQZJ8f39Yph2CEuWT72Qmz8c5nAOfz8x839/XCZxXvjP5EmBZliUAAAAYE%2BjtAQAAAPwNBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGObw9gBNRVnZBeOvGRgYoOjo5jp//pJqay3jr98Ukal5ZGoemTYMcjWvMWR6550tvHJcrmD5sMDAAAUEBCgwMMDbo/gNMjWPTM0j04ZBruY15UwpWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgmMPbA%2BDW9JrzvrdHqLft0x7w9ggAANiCK1gAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGE%2BXbA%2B%2BugjJScna/r06XX2tm3bpmHDhql79%2B5KS0vTvn373Hu1tbVavny5Bg4cqN69e2vChAk6c%2BaMe9/lcmnatGlKTk5W3759NWfOHFVVVdlyTgAAwPf5bMH65S9/qYULF%2Bree%2B%2Bts3fkyBHNmjVLM2fO1B/%2B8AdlZmbqueee09mzZyVJ69ev15YtW5Sbm6vdu3crNjZWWVlZsixLkjRv3jxVVlZq69at%2Bu1vf6sTJ05o6dKltp4fAADwXT5bsEJCQrRhw4YbFqz8/HylpKQoJSVFISEhGj58uOLi4rR582ZJUl5enjIzM3XfffcpLCxM06dP14kTJ3To0CF9%2BeWX%2BuCDDzR9%2BnRFR0erVatWmjJlin7729/q6tWrdp8mAADwQQ5vD/BDjR8//lv3ioqKlJKS4rEWHx8vp9OpqqoqHT9%2BXPHx8e69sLAw3XvvvXI6nbpw4YKCgoLUoUMH937nzp11%2BfJlnTx50mP925SWlqqsrMxjzeFoppiYmPqeXr0EBflWP3Y4Gv%2B81zL1tWwbMzI1j0wbBrma15Qz9dmC9V1cLpciIiI81iIiInT8%2BHF99dVXsizrhvvl5eWKjIxUWFiYAgICPPYkqby8vF7Hz8vLU05OjsdaVlaWpk6d%2BkNOx29ERTX39gj1Fh5%2Bu7dH8Dtkah6ZNgxyNa8pZuqXBUuS%2B/NUP2T/Zs%2B9mdGjRys1NdVjzeFopvLyS7f0utfzte8ITJ9/QwgKClR4%2BO2qqKhUTU2tt8fxC2RqHpk2DHI1rzFk6q1v7v2yYEVFRcnlcnmsuVwuRUdHKzIyUoGBgTfcb9mypaKjo3Xx4kXV1NQoKCjIvSdJLVu2rNfxY2Ji6rwdWFZ2QdXVTfsvrC%2Bdf01NrU/N6wvI1DwybRjkal5TzNS3LoHUU0JCggoLCz3WnE6nEhMTFRISovbt26uoqMi9V1FRoc8%2B%2B0xdu3ZVp06dZFmWjh496vHc8PBwtW3b1rZzAAAAvssvC9aoUaO0f/9%2B7dmzR1euXNGGDRt0%2BvRpDR8%2BXJKUkZGhtWvX6sSJE7p48aKWLl2qTp06qUuXLoqOjtbgwYP16quv6vz58zp79qxWrlyp9PR0ORx%2BecEPAAAY5rONoUuXLpKk6upqSdIHH3wg6ZurTXFxcVq6dKmys7NVXFysdu3aafXq1brzzjslSWPGjFFZWZn%2B8R//UZcuXVJSUpLHh9J//vOfa/78%2BRo4cKBuu%2B02PfbYYze8mSkAAMCNBFi3%2Bolu1EtZ2QXjr%2BlwBOrhpR8Zf92Gsn3aA94e4aYcjkBFRTVXefmlJvd5gYZCpuaRacMgV/MaQ6Z33tnCK8f1y7cIAQAAvImCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhvltwTp8%2BLDGjx%2BvXr166YEHHtDMmTN1/vx5SVJBQYHS09PVo0cPDR06VJs3b/Z47tq1azV48GD16NFDGRkZKiws9MYpAAAAH%2BWXBau6ulrPPPOMunXrpv3792vr1q06f/68XnrpJZWWlmrKlCkaM2aMCgoKNGfOHM2bN09Op1OStGvXLq1YsUKvvPKK9u/frwEDBmjy5Mm6fPmyl88KAAD4Cr8sWGVlZSorK9Pjjz%2Bu4OBgRUVF6eGHH9aRI0e0ZcsWxcbGKj09XSEhIUpOTlZqaqry8/MlSXl5eUpLS1NiYqJCQ0M1ceJESdLu3bu9eUoAAMCHOLw9QENo1aqVOnXqpLy8PP3Lv/yLqqqqtHPnTvXv319FRUWKj4/3eHx8fLy2b98uSSoqKtKQIUPce4GBgerUqZOcTqeGDh1ar%2BOXlpaqrKzMY83haKaYmJhbPDNPQUG%2B1Y8djsY/77VMfS3bxoxMzSPThkGu5jXlTP2yYAUGBmrFihXKzMzUW2%2B9JUnq06ePZsyYoSlTpqhVq1Yej4%2BMjFR5ebkkyeVyKSIiwmM/IiLCvV8feXl5ysnJ8VjLysrS1KlTf8jp%2BI2oqObeHqHewsNv9/YIfodMzSPThkGu5jXFTP2yYH399deaPHmyHnnkEffnpxYsWKCZM2fW6/mWZd3S8UePHq3U1FSPNYejmcrLL93S617P174jMH3%2BDSEoKFDh4beroqJSNTW13h7HL5CpeWTaMMjVvMaQqbe%2BuffLglVQUKDPP/9cL7zwgoKCgtSiRQtNnTpVjz/%2BuB588EG5XC6Px5eXlys6OlqSFBUVVWff5XKpffv29T5%2BTExMnbcDy8ouqLq6af%2BF9aXzr6mp9al5fQGZmkemDYNczWuKmfrWJZB6qqmpUW1trceVqK%2B//lqSlJycXOe2C4WFhUpMTJQkJSQkqKioyOO1Dh8%2B7N4HAAC4Gb8sWN27d1ezZs20YsUKVVZWqry8XKtWrVLv3r31%2BOOPq7i4WPn5%2Bbpy5Yr27t2rvXv3atSoUZKkjIwMbdy4UQcPHlRlZaVWrVql4OBg9e/f37snBQAAfIZfFqyoqCj9%2B7//uz755BP169dPjz32mEJDQ7Vs2TK1bNlSq1ev1rp169SzZ08tWrRIS5YsUceOHSVJ/fr10wsvvKBp06apT58%2B2r9/v3JzcxUaGurlswIAAL4iwLrVT3SjXsrKLhh/TYcjUA8v/cj46zaU7dMe8PYIN%2BVwBCoqqrnKyy81uc8LNBQyNY9MGwa5mtcYMr3zzhZeOa5fXsECAADwJgoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhtlesFJTU5WTk6OSkhK7Dw0AAGAL2wvWiBEjtG3bNj300EOaOHGidu7cqerqarvHAAAAaDC2F6ysrCxt27ZN77zzjtq3b69FixYpJSVFS5Ys0alTp%2BweBwAAwDivfQarc%2BfOmjVrlnbv3q3Zs2frnXfe0ZAhQzRhwgT95S9/8dZYAAAAt8xrBevq1avatm2bnn76ac2aNUutWrXSz372M3Xq1EmZmZnasmWLt0YDAAC4JQ67D3jixAlt2LBBGzdu1KVLlzR48GC99dZb6tmzp/sxvXv31ksvvaRhw4bZPR4AAMAts71gDR06VG3bttWkSZP0xBNPKDIyss5jUlJSdP78ebtHAwAAMML2grV27Vr16dPnpo87dOiQDdMAAACYZ/tnsDp06KDJkyfrgw8%2BcK/9%2Bte/1tNPPy2Xy2X3OAAAAMbZXrCys7N14cIFtWvXzr3Wv39/1dbWavHixXaPAwAAYJztbxHu27dPW7ZsUVRUlHstNjZWS5cu1WOPPWb3OAAAAMbZfgWrqqpKISEhdQcJDFRlZaXd4wAAABhne8Hq3bu3Fi9erK%2B%2B%2Bsq99sUXX2jBggUet2oAAADwVba/RTh79mz98z//s%2B6//36FhYWptrZWly5d0t13363f/OY3do8DAABgnO0F6%2B6779Z7772n3/3ud/rss88UGBiotm3bqm/fvgoKCrJ7HAAAAONsL1iSFBwcrIceesgbhwYAAGhwthesM2fOaNmyZfr0009VVVVVZ//DDz%2B0eyQAAACjvPIZrNLSUvXt21fNmjWz%2B/AAAAANzvaCVVhYqA8//FDR0dENfqxVq1Zp/fr1unjxorp166aFCxfqrrvuUkFBgZYtW6aTJ0/qRz/6kSZNmqThw4e7n7d27VqtX79eZWVl6tChg%2BbMmaOEhIQGnxcAAPgH22/T0LJlS1uuXK1fv16bN2/W2rVrtW/fPrVr106//vWvVVpaqilTpmjMmDEqKCjQnDlzNG/ePDmdTknSrl27tGLFCr3yyivav3%2B/BgwYoMmTJ%2Bvy5csNPjMAAPAPthesSZMmKScnR5ZlNehx1qxZo%2BnTp%2BvHP/6xwsLCNHfuXM2dO1dbtmxRbGys0tPTFRISouTkZKWmpio/P1%2BSlJeXp7S0NCUmJio0NFQTJ06UJO3evbtB5wUAAP7D9rcIf/e73%2BmTTz7Ru%2B%2B%2Bq7vuukuBgZ4d7%2B23377lY3zxxRf6/PPP9dVXX2nIkCE6d%2B6ckpKS9NJLL6moqEjx8fEej4%2BPj9f27dslSUVFRRoyZIh7LzAwUJ06dZLT6dTQoUPrdfzS0lKVlZV5rDkczRQTE3OLZ%2BYpKMj2fnxLHI7GP%2B%2B1TH0t28aMTM0j04ZBruY15UxtL1hhYWHq169fgx7j7NmzkqT3339fb775pizL0tSpUzV37lxVVVWpVatWHo%2BPjIxUeXm5JMnlcikiIsJjPyIiwr1fH3l5ecrJyfFYy8rK0tSpU3/I6fiNqKjm3h6h3sLDb/f2CH6HTM0j04ZBruY1xUxtL1jZ2dkNfoxrbz9OnDjRXaaef/55Pf3000pOTq7383%2Bo0aNHKzU11WPN4Wim8vJLt/S61/O17whMn39DCAoKVHj47aqoqFRNTa23x/ELZGoemTYMcjWvMWTqrW/uvXKj0ZMnT%2Bq9997T//3f/7kL14EDB9S9e3cjr3/HHXdIksLDw91rbdq0kWVZunr1qlwul8fjy8vL3T/VGBUVVWff5XKpffv29T5%2BTExMnbcDy8ouqLq6af%2BF9aXzr6mp9al5fQGZmkemDYNczWuKmdp%2BCaSgoEDDhw/Xzp07tXXrVknf3Hx0/Pjxxm4y2rp1a4WFhenIkSPuteLiYt12221KSUlRYWGhx%2BMLCwuVmJgoSUpISFBRUZF7r6amRocPH3bvAwAA3IztBWv58uX66U9/qi1btiggIEDSN/8/4eLFi7Vy5Uojx3A4HEpPT9cbb7yh//3f/9W5c%2Be0cuVKDRs2TE8%2B%2BaSKi4uVn5%2BvK1euaO/evdq7d69GjRolScrIyNDGjRt18OBBVVZWatWqVQoODlb//v2NzAYAAPyf7W8R/s///I/WrVsnSe6CJUmPPPKIZs%2Bebew4M2bM0Ndff62RI0fq6tWrGjx4sObOnavmzZtr9erVWrhwoRYsWKA2bdpoyZIl6tixoySpX79%2BeuGFFzRt2jSdO3dOXbp0UW5urkJDQ43NBgAA/JvtBatFixaqqqpScHCwx3ppaWmdtVsRHBys%2BfPna/78%2BXX2evfurU2bNn3rc8eOHauxY8camwUAADQttr9F2KNHDy1atEgXL150r506dUqzZs3S/fffb/c4AAAAxtl%2BBetnP/uZnnrqKSUlJammpkY9evRQZWWl2rdvr8WLF9s9DgAAgHG2F6zWrVtr69at2rt3r06dOqXQ0FC1bdtWDzzwgMdnsgAAAHyVV%2B6Dddttt%2Bmhhx7yxqEBAAAanO0FKzU19TuvVJm6FxYAAIC32F6whgwZ4lGwampqdOrUKTmdTj311FN2jwMAAGCc7QVr5syZN1zfsWOH/vjHP9o8DQAAgHmN5n8Lfuihh/Tee%2B95ewwAAIBb1mgK1uHDh2VZlrfHAAAAuGW2v0U4ZsyYOmuVlZU6ceKEBg0aZPc4AAAAxtlesGJjY%2Bv8FGFISIjS09M1cuRIu8cBAAAwzvaCxd3aAQCAv7O9YG3cuLHej33iiScacBIAAICGYXvBmjNnjmpra%2Bt8oD0gIMBjLSAggIIFAAB8ku0F61e/%2BpXWrFmjyZMnq0OHDrIsS8eOHdMvf/lLjRs3TklJSXaPBAAAYJRXPoOVm5urVq1audd69eqlu%2B%2B%2BWxMmTNDWrVvtHgkAAMAo2%2B%2BDdfr0aUVERNRZDw8PV3Fxsd3jAAAAGGd7wWrTpo0WL16s8vJy91pFRYWWLVume%2B65x%2B5xAAAAjLP9LcLZs2drxowZysvLU/PmzRUYGKiLFy8qNDRUK1eutHscAAAA42wvWH379tWePXu0d%2B9enT17VpZlqVWrVnrwwQfVokULu8cBAAAwzvaCJUm33367Bg4cqLNnz%2Bruu%2B/2xggAAAANxvbPYFVVVWnWrFnq3r27Hn30UUnffAZr4sSJqqiosHscAAAA42wvWEuWLNGRI0e0dOlSBQb%2B7fA1NTVaunSp3eMAAAAYZ3vB2rFjh15//XU98sgj7v/0OTw8XNnZ2dq5c6fd4wAAABhne8G6dOmSYmNj66xHR0fr8uXLdo8DAABgnO0F65577tEf//hHSfL4vwfff/99/cM//IPd4wAAABhn%2B08Rjh07Vs8//7xGjBih2tpavfnmmyosLNSOHTs0Z84cu8cBAAAwzvaCNXr0aDkcDq1bt05BQUF644031LZtWy1dulSPPPKI3eMAAAAYZ3vBOn/%2BvEaMGKERI0bYfWgAAABb2P4ZrIEDB3p89goAAMDf2F6wkpKStH37drsPCwAAYBvb3yL80Y9%2BpF/84hfKzc3VPffco9tuu81jf9myZXaPBAAAYJTtBev48eP68Y9/LEkqLy%2B3%2B/AAAAANzraCNX36dC1fvly/%2Bc1v3GsrV65UVlaWXSMAAADYwrbPYO3atavOWm5url2HBwAAsI1tBetGPznITxMCAAB/ZFvBuvYfO99sDQAAwNfZfpsGAAAAf0fBAgAAMMy2nyK8evWqZsyYcdM17oMFAAB8nW0Fq2fPniotLb3pGgAAgK%2BzrWD9/f2vAAAA/BmfwQIAADCMggUAAGAYBQsAAMAwChYAAIBhTaJgLVq0SB06dHD/uaCgQOnp6erRo4eGDh2qzZs3ezx%2B7dq1Gjx4sHr06KGMjAwVFhbaPTIAAPBhfl%2Bwjhw5ok2bNrn/XFpaqilTpmjMmDEqKCjQnDlzNG/ePDmdTknf/KfUK1as0CuvvKL9%2B/drwIABmjx5si5fvuytUwAAAD7GrwtWbW2t5s%2Bfr8zMTPfali1bFBsbq/T0dIWEhCg5OVmpqanKz8%2BXJOXl5SktLU2JiYkKDQ3VxIkTJUm7d%2B/2xikAAAAfZNt9sLzh7bffVkhIiIYNG6ZXX31VklRUVKT4%2BHiPx8XHx2v79u3u/SFDhrj3AgMD1alTJzmdTg0dOrRexy0tLVVZWZnHmsPRTDExMbdyOnUEBflWP3Y4Gv%2B81zL1tWwbMzI1j0wbBrma15Qz9duC9eWXX2rFihV1bnDqcrnUqlUrj7XIyEiVl5e79yMiIjz2IyIi3Pv1kZeXp5ycHI%2B1rKwsTZ069fucgt%2BJimru7RHqLTz8dm%2BP4HfI1DwybRjkal5TzNRvC1Z2drbS0tLUrl07ff7559/ruZZl3dKxR48erdTUVI81h6OZyssv3dLrXs/XviMwff4NISgoUOHht6uiolI1NbXeHscvkKl5ZNowyNW8xpCpt76598uCVVBQoAMHDmjr1q119qKiouRyuTzWysvLFR0d/a37LpdL7du3r/fxY2Ji6rwdWFZ2QdXVTfsvrC%2Bdf01NrU/N6wvI1DwybRjkal5TzNS3LoHU0%2BbNm3Xu3DkNGDBASUlJSktLkyQlJSUpLi6uzm0XCgsLlZiYKElKSEhQUVGRe6%2BmpkaHDx927wMAANyMXxasF198UTt27NCmTZu0adMm5ebmSpI2bdqkYcOGqbi4WPn5%2Bbpy5Yr27t2rvXv3atSoUZKkjIwMbdy4UQcPHlRlZaVWrVql4OBg9e/f34tnBAAAfIlfvkUYERHh8UH16upqSVLr1q0lSatXr9bChQu1YMECtWnTRkuWLFHHjh0lSf369dMLL7ygadOm6dy5c%2BrSpYtyc3MVGhpq/4kAAACf5JcF63p33XWXjh075v5z7969PW4%2Ber2xY8dq7NixdowGAAD8kF%2B%2BRQgAAOBNFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADDMbwtWcXGxsrKylJSUpOTkZL344ouqqKiQJB05ckTjxo1Tz549NWjQIK1Zs8bjudu2bdOwYcPUvXt3paWlad%2B%2Bfd44BQAA4KP8tmBNnjxZ4eHh2rVrl9599119%2Bumn%2Brd/%2BzdVVVVp0qRJ%2BslPfqKPPvpIy5cv1%2BrVq7Vz505J35SvWbNmaebMmfrDH/6gzMxMPffcczp79qyXzwgAAPgKvyxYFRUVSkhI0IwZM9S8eXO1bt1aTz75pP70pz9pz549unr1qp599lk1a9ZMnTt31siRI5WXlydJys/PV0pKilJSUhQSEqLhw4crLi5Omzdv9vJZAQAAX%2BHw9gANITw8XNnZ2R5rJSUliomJUVFRkTp06KCgoCD3Xnx8vPLz8yVJRUVFSklJ8XhufHy8nE5nvY9fWlqqsrIyjzWHo5liYmK%2B76l8p6Ag3%2BrHDkfjn/dapr6WbWNGpuaRacMgV/OacqZ%2BWbCu53Q6tW7dOq1atUrbt29XeHi4x35kZKRcLpdqa2vlcrkUERHhsR8REaHjx4/X%2B3h5eXnKycnxWMvKytLUqVN/%2BEn4gaio5t4eod7Cw2/39gh%2Bh0zNI9OGQa7mNcVM/b5g/fnPf9azzz6rGTNmKDk5Wdu3b7/h4wICAty/tyzrlo45evRopaameqw5HM1UXn7pll73er72HYHp828IQUGBCg%2B/XRUVlaqpqfX2OH6BTM0j04ZBruY1hky99c29XxesXbt26ac//anmzZunJ554QpIUHR2t06dPezzO5XIpMjJSgYGBioqKksvlqrMfHR1d7%2BPGxMTUeTuwrOyCqqub9l9YXzr/mppan5rXF5CpeWTaMMjVvKaYqW9dAvkePvnkE82aNUuvvfaau1xJUkJCgo4dO6bq6mr3mtPpVGJionu/sLDQ47X%2Bfh8AAOBm/LJgVVdXa%2B7cuZo5c6b69u3rsZeSkqKwsDCtWrVKlZWVOnTokDZs2KCMjAxJ0qhRo7R//37t2bNHV65c0YYNG3T69GkNHz7cG6cCAAB8kF%2B%2BRXjw4EGdOHFCCxcu1MKFCz323n//fb3xxhuaP3%2B%2BcnNzdccdd2j69Onq37%2B/JCkuLk5Lly5Vdna2iouL1a5dO61evVp33nmnF84EAAD4Ir8sWL169dKxY8e%2B8zH/%2BZ//%2Ba17gwYN0qBBg0yPBQAAmgi/fIsQAADAmyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYJhf3qYBjdOjr/7e2yN8L9unPeDtEQAAPoorWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMAoWAACAYRQsAAAAwyhYAAAAhlGwAAAADKNgAQAAGEbBAgAAMIyCBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhDm8PADRWj776e2%2BP8L1sn/aAt0cAAPwVV7AAAAAMo2ABAAAYRsECAAAwjIIFAABgGAULAADAMH6KEIDt%2BAlNAP7rJ0iQAAAK7UlEQVSOK1gAAACGcQXrBoqLi7VgwQIdOnRIzZo105AhQzRjxgwFBtJHgaaIK24Avi8K1g08//zz6ty5sz744AOdO3dOkyZN0h133KF/%2Bqd/8vZoAADAB3BJ5jpOp1NHjx7VzJkz1aJFC8XGxiozM1N5eXneHg0AAPgIrmBdp6ioSG3atFFERIR7rXPnzjp16pQuXryosLCwm75GaWmpysrKPNYcjmaKiYkxOmtQEP0Yf%2BNrb2Oh4Tgc/NvwQ1z7N9Wf/m19eOlH3h6h3v7fzAe9PYJRFKzruFwuhYeHe6xdK1vl5eX1Klh5eXnKycnxWHvuuef0/PPPmxtU3xS5p1p/qtGjRxsvb01VaWmp8vLyyNQgMjWPTBtGaWmp3nrrV36V659%2B8YhXj9%2BUv1b9p6YbZFnWLT1/9OjRevfddz1%2BjR492tB0f1NWVqacnJw6V8vww5GpeWRqHpk2DHI1rylnyhWs60RHR8vlcnmsuVwuBQQEKDo6ul6vERMT0%2BSaOgAA%2BBuuYF0nISFBJSUlOn/%2BvHvN6XSqXbt2at68uRcnAwAAvoKCdZ34%2BHh16dJFy5Yt08WLF3XixAm9%2BeabysjI8PZoAADARwS99NJLL3l7iMbmwQcf1NatW/Xyyy/rvffeU3p6uiZMmKCAgABvj1ZH8%2BbN1adPH66uGUSm5pGpeWTaMMjVvKaaaYB1q5/oBgAAgAfeIgQAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACGUbAAAAAMo2ABAAAYRsECAAAwjILlg4qLi/XMM88oKSlJAwYM0JIlS1RbW%2BvtsRq9jz76SMnJyZo%2BfXqdvW3btmnYsGHq3r270tLStG/fPvdebW2tli9froEDB6p3796aMGGCzpw5Y%2BfojVZxcbGysrKUlJSk5ORkvfjii6qoqJAkHTlyROPGjVPPnj01aNAgrVmzxuO535V5U3b06FE99dRT6tmzp5KTkzVt2jSVlZVJkgoKCpSenq4ePXpo6NCh2rx5s8dz165dq8GDB6tHjx7KyMhQYWGhN06hUVu0aJE6dOjg/jOZ/nAdOnRQQkKCunTp4v718ssvSyJXSZIFn/Pkk09ac%2BfOtSoqKqxTp05ZgwYNstasWePtsRq13Nxca9CgQdaYMWOsadOmeewdPnzYSkhIsPbs2WNVVVVZmzZtshITE62SkhLLsixr7dq11oABA6zjx49bFy5csH7%2B859bw4YNs2pra71xKo3KY489Zr344ovWxYsXrZKSEistLc2aPXu2VVlZaT344IPWihUrrEuXLlmFhYVWnz59rB07dliWdfPMm6orV65Y999/v5WTk2NduXLFOnfunDVu3DhrypQp1hdffGF169bNys/Pt6qqqqzf//73VteuXa2//OUvlmVZ1ocffmj16tXLOnjwoFVZWWmtXr3aeuCBB6xLly55%2Bawaj8OHD1t9%2BvSx4uLiLMuyyPQWxcXFWWfOnKmzTq7f4AqWj3E6nTp69KhmzpypFi1aKDY2VpmZmcrLy/P2aI1aSEiINmzYoHvvvbfOXn5%2BvlJSUpSSkqKQkBANHz5ccXFx7u%2B48vLylJmZqfvuu09hYWGaPn26Tpw4oUOHDtl9Go1KRUWFEhISNGPGDDVv3lytW7fWk08%2BqT/96U/as2ePrl69qmeffVbNmjVT586dNXLkSPfX6c0yb6oqKys1ffp0TZo0ScHBwYqOjtbDDz%2BsTz/9VFu2bFFsbKzS09MVEhKi5ORkpaamKj8/X9I3X6dpaWlKTExUaGioJk6cKEnavXu3N0%2Bp0aitrdX8%2BfOVmZnpXiPThkGu36Bg%2BZiioiK1adNGERER7rXOnTvr1KlTunjxohcna9zGjx%2BvFi1a3HCvqKhI8fHxHmvx8fFyOp2qqqrS8ePHPfbDwsJ07733yul0NujMjV14eLiys7N1xx13uNdKSkoUExOjoqIidejQQUFBQe69%2BPh499sA35V5UxYREaGRI0fK4XBIkk6ePKn/%2Bq//0qOPPvqtmX1bpoGBgerUqVOTz/Sat99%2BWyEhIRo2bJh7jUxv3bJly9S/f3/16tVL8%2BbN06VLl8j1ryhYPsblcik8PNxj7VrZKi8v98ZIPs/lcnkUVumbTMvLy/XVV1/Jsqxv3cffOJ1OrVu3Ts8%2B%2B%2BwNv04jIyPlcrlUW1v7nZnjm8%2B2JSQkaMiQIerSpYumTp36rZley4xMv92XX36pFStWaP78%2BR7rZHprunXrpuTkZO3cuVN5eXk6ePCgFixYQK5/RcHyQZZleXsEv3OzTMn8u/35z3/WhAkTNGPGDCUnJ3/r4wICAty/J9Nv16ZNGzmdTr3//vs6ffq0/vVf/7VezyPTG8vOzlZaWpratWv3vZ9Lpt8uLy9PI0eOVHBwsO677z7NnDlTW7du1dWrV2/63KaQKwXLx0RHR8vlcnmsuVwuBQQEKDo62ktT%2BbaoqKgbZhodHa3IyEgFBgbecL9ly5Z2jtlo7dq1S88884xmz56t8ePHS/rm6/T670ZdLpc7z%2B/KHN8ICAhQbGyspk%2Bfrq1bt8rhcNTJrLy83J0Zmd5YQUGBDhw4oKysrDp7N8qMTH%2B4u%2B66SzU1NTf8N7Mp5krB8jEJCQkqKSnR%2BfPn3WtOp1Pt2rVT8%2BbNvTiZ70pISKjzI8JOp1OJiYkKCQlR%2B/btVVRU5N6rqKjQZ599pq5du9o9aqPzySefaNasWXrttdf0xBNPuNcTEhJ07NgxVVdXu9euZXpt/9syb8oKCgo0ePBgj9uuBAZ%2B8890165d62RWWFjokenff53W1NTo8OHDTT7TzZs369y5cxowYICSkpKUlpYmSUpKSlJcXByZ/kCHDx/W4sWLPdZOnDih4OBgpaSkkKvEbRp80ciRI63Zs2dbFy5csI4fP26lpqZa69at8/ZYPmHWrFl1btNw7Ngxq0uXLtbu3butqqoqKz8/3%2BrevbtVWlpqWZZl/cd//IfVv39/920a5s2bZ40YMcIb4zcqV69etR599FHr7bffrrN35coVa8CAAdbrr79uXb582Tp48KDVq1cva/fu3ZZl3TzzpqqiosJKTk62Fi9ebF2%2BfNk6d%2B6cNWHCBGvs2LHWl19%2BaXXv3t165513rKqqKmvPnj1W165drSNHjliWZVl79%2B61evbsaR04cMC6fPmytWLFCislJcWqrKz08ll5l8vlskpKSty/Dhw4YMXFxVklJSVWcXExmf5AZ8%2Betbp162atXr3aunLlinXy5ElryJAh1ssvv8zX6l9RsHxQSUmJNXHiRKtr165WcnKy9frrr3NPpptISEiwEhISrI4dO1odO3Z0//maHTt2WIMGDbI6d%2B5sPf7449bHH3/s3qutrbVee%2B016/7777e6du1qPf30003%2Bfk2WZVn//d//bcXFxbmz/Ptfn3/%2BuXXs2DFrzJgxVkJCgtW/f39r/fr1Hs//rsybsqNHj1rjxo2zunbtav3kJz%2Bxpk2bZp09e9ayLMv6%2BOOPreHDh1udO3e2Bg0a5L6v2DXr16%2B3UlJSrISEBCsjI8M6duyYN06hUTtz5oz7PliWRaa34uOPP7ZGjx5tdevWzerTp4%2BVnZ1tVVVVufeaeq4BltUEPmkGAABgIz6DBQAAYBgFCwAAwDAKFgAAgGEULAAAAMMoWAAAAIZRsAAAAAyjYAEAABhGwQIAADCMggUAAGAYBQsAAMAwChYAAIBhFCwAAADDKFgAAACG/X%2B6YhQJN6qbLgAAAABJRU5ErkJggg%3D%3D"/>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12" id="common-1641287166913019484">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">8.05</td>
        <td class="number">60</td>
        <td class="number">4.6%</td>
        <td>
            <div class="bar" style="width:7%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">13.0</td>
        <td class="number">59</td>
        <td class="number">4.5%</td>
        <td>
            <div class="bar" style="width:7%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">7.75</td>
        <td class="number">55</td>
        <td class="number">4.2%</td>
        <td>
            <div class="bar" style="width:7%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">26.0</td>
        <td class="number">50</td>
        <td class="number">3.8%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">7.8958</td>
        <td class="number">49</td>
        <td class="number">3.7%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">10.5</td>
        <td class="number">35</td>
        <td class="number">2.7%</td>
        <td>
            <div class="bar" style="width:4%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">7.775</td>
        <td class="number">26</td>
        <td class="number">2.0%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">7.2292</td>
        <td class="number">24</td>
        <td class="number">1.8%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">7.925</td>
        <td class="number">23</td>
        <td class="number">1.8%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">26.55</td>
        <td class="number">22</td>
        <td class="number">1.7%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (271)</td>
        <td class="number">905</td>
        <td class="number">69.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12"  id="extreme-1641287166913019484">
            <p class="h4">Minimum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0.0</td>
        <td class="number">17</td>
        <td class="number">1.3%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3.1708</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4.0125</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">5.0</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">6.2375</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:6%">&nbsp;</div>
        </td>
</tr>
</table>
            <p class="h4">Maximum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">227.525</td>
        <td class="number">5</td>
        <td class="number">0.4%</td>
        <td>
            <div class="bar" style="width:71%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">247.5208</td>
        <td class="number">3</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:43%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">262.375</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">263.0</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:85%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">512.3292</td>
        <td class="number">4</td>
        <td class="number">0.3%</td>
        <td>
            <div class="bar" style="width:57%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
    </div>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_home.dest">home.dest<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="alert">
            <th>Distinct count</th>
            <td>370</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>28.3%</td>
        </tr>
        <tr class="alert">
            <th>Missing (%)</th>
            <td>43.1%</td>
        </tr>
        <tr class="alert">
            <th>Missing (n)</th>
            <td>564</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable4622614539229109798">
    <table class="mini freq">
        <tr class="">
    <th>New York, NY</th>
    <td>
        <div class="bar" style="width:10%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 4.9%">
            &nbsp;
        </div>
        64
    </td>
</tr><tr class="">
    <th>London</th>
    <td>
        <div class="bar" style="width:3%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 1.1%">
            &nbsp;
        </div>
        14
    </td>
</tr><tr class="">
    <th>Montreal, PQ</th>
    <td>
        <div class="bar" style="width:2%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.8%">
            &nbsp;
        </div>
        10
    </td>
</tr><tr class="other">
    <th>Other values (366)</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 50.2%">
            657
        </div>

    </td>
</tr><tr class="missing">
    <th>(Missing)</th>
    <td>
        <div class="bar" style="width:85%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 43.1%">
            564
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable4622614539229109798, #minifreqtable4622614539229109798"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable4622614539229109798">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">New York, NY</td>
        <td class="number">64</td>
        <td class="number">4.9%</td>
        <td>
            <div class="bar" style="width:11%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">London</td>
        <td class="number">14</td>
        <td class="number">1.1%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Montreal, PQ</td>
        <td class="number">10</td>
        <td class="number">0.8%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Cornwall / Akron, OH</td>
        <td class="number">9</td>
        <td class="number">0.7%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Paris, France</td>
        <td class="number">9</td>
        <td class="number">0.7%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Philadelphia, PA</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Wiltshire, England Niagara Falls, NY</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Winnipeg, MB</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Brooklyn, NY</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Belfast</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (359)</td>
        <td class="number">601</td>
        <td class="number">45.9%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="missing">
        <td class="fillremaining">(Missing)</td>
        <td class="number">564</td>
        <td class="number">43.1%</td>
        <td>
            <div class="bar" style="width:93%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_name">name<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="alert">
            <th>Distinct count</th>
            <td>1307</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>99.8%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (%)</th>
            <td>0.0%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (n)</th>
            <td>0</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable2773139842415725495">
    <table class="mini freq">
        <tr class="">
    <th>Connolly, Miss. Kate</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.2%">
            &nbsp;
        </div>
        2
    </td>
</tr><tr class="">
    <th>Kelly, Mr. James</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.2%">
            &nbsp;
        </div>
        2
    </td>
</tr><tr class="">
    <th>Risien, Mrs. Samuel (Emma)</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.1%">
            &nbsp;
        </div>
        1
    </td>
</tr><tr class="other">
    <th>Other values (1304)</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 99.6%">
            1304
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable2773139842415725495, #minifreqtable2773139842415725495"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable2773139842415725495">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">Connolly, Miss. Kate</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Kelly, Mr. James</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Risien, Mrs. Samuel (Emma)</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Ilmakangas, Miss. Ida Livija</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Ilett, Miss. Bertha</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Douglas, Mr. Walter Donald</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Coleff, Mr. Satio</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Peters, Miss. Katie</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Christmann, Mr. Emil</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">Hellstrom, Miss. Hilda Maria</td>
        <td class="number">1</td>
        <td class="number">0.1%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (1297)</td>
        <td class="number">1297</td>
        <td class="number">99.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_parch">parch<br/>
            <small>Numeric</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Distinct count</th>
                    <td>8</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>0.6%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (n)</th>
                    <td>0</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (n)</th>
                    <td>0</td>
                </tr>
            </table>

        </div>
        <div class="col-sm-6">
            <table class="stats ">

                <tr>
                    <th>Mean</th>
                    <td>0.38503</td>
                </tr>
                <tr>
                    <th>Minimum</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Maximum</th>
                    <td>9</td>
                </tr>
                <tr class="alert">
                    <th>Zeros (%)</th>
                    <td>76.5%</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minihistogram8522789940792607072">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAARZJREFUeJzt3cEJAjEQQFEVS7IIe/JsTxZhT/Eu8tHAuou%2Bdw/M5TPJKfsxxtgBLx3WHgC27Lj2AM9Ol9vHZ%2B7X8wKTgA0CSSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQNvcN9AxfR7MUGwSCQCD8xBVrhmsZ77BBIAgEgkAg/O0bZMbMu%2BUbvI2Wsx9jjLWHgK1yxYIgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoHwAHz7FJXKElCqAAAAAElFTkSuQmCC">

</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#descriptives8522789940792607072,#minihistogram8522789940792607072"
       aria-expanded="false" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="row collapse col-md-12" id="descriptives8522789940792607072">
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#quantiles8522789940792607072"
                                                  aria-controls="quantiles8522789940792607072" role="tab"
                                                  data-toggle="tab">Statistics</a></li>
        <li role="presentation"><a href="#histogram8522789940792607072" aria-controls="histogram8522789940792607072"
                                   role="tab" data-toggle="tab">Histogram</a></li>
        <li role="presentation"><a href="#common8522789940792607072" aria-controls="common8522789940792607072"
                                   role="tab" data-toggle="tab">Common Values</a></li>
        <li role="presentation"><a href="#extreme8522789940792607072" aria-controls="extreme8522789940792607072"
                                   role="tab" data-toggle="tab">Extreme Values</a></li>

    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active row" id="quantiles8522789940792607072">
            <div class="col-md-4 col-md-offset-1">
                <p class="h4">Quantile statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Minimum</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>5-th percentile</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Q1</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Median</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Q3</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>95-th percentile</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>Maximum</th>
                        <td>9</td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td>9</td>
                    </tr>
                    <tr>
                        <th>Interquartile range</th>
                        <td>0</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4 col-md-offset-2">
                <p class="h4">Descriptive statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Standard deviation</th>
                        <td>0.86556</td>
                    </tr>
                    <tr>
                        <th>Coef of variation</th>
                        <td>2.2481</td>
                    </tr>
                    <tr>
                        <th>Kurtosis</th>
                        <td>21.541</td>
                    </tr>
                    <tr>
                        <th>Mean</th>
                        <td>0.38503</td>
                    </tr>
                    <tr>
                        <th>MAD</th>
                        <td>0.58945</td>
                    </tr>
                    <tr class="">
                        <th>Skewness</th>
                        <td>3.6691</td>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>504</td>
                    </tr>
                    <tr>
                        <th>Variance</th>
                        <td>0.74919</td>
                    </tr>
                    <tr>
                        <th>Memory size</th>
                        <td>10.3 KiB</td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane col-md-8 col-md-offset-2" id="histogram8522789940792607072">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzt3X9YlXWe//EXhyOg/BJKcNet0RYzEdeylB00Uax0NC2JRKZZY0czkuRSYS7LH5c124iNeNUsuI7OlOnYtTE4beLPHEMtV5q9rKYFpLYcu2bkkjjJOaGEP/jx/aNv7JzQjeLjfXPOeT6uq6u878O53/f14con97k5J6ijo6NDAAAAMMZh9wAAAAD%2BhsACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwzGn3AIHC5Tpn/DkdjiDFxoarsbFZ7e0dxp8f34w1sB9rYD/WwH6swdUNGBBpy3G5guXDHI4gBQUFyeEIsnuUgMUa2I81sB9rYD/WoPchsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAzz6cB66623lJKSoiVLlnTZt3fvXs2YMUO33Xab0tPTdfTo0c597e3teu655zR58mSNGTNG8%2BbN01/%2B8pfO/R6PR4sXL1ZKSorGjx%2BvFStW6MKFC5acEwAA8H0%2BG1i/%2BtWv9Mwzz%2Bh73/tel321tbVatmyZCgoK9Pbbbys7O1uPP/646uvrJUkvv/yydu3apc2bN%2BvQoUMaPHiwcnNz1dHx5ec3rVq1Si0tLdq9e7d%2B97vf6eTJkyoqKrL0/AAAgO/y2cAKDQ3Vjh07rhhYZWVlSk1NVWpqqkJDQzVz5kzdfPPNKi8vlySVlpYqOztbf//3f6%2BIiAgtWbJEJ0%2Be1Pvvv6/PPvtMBw8e1JIlSxQbG6v4%2BHgtXLhQv/vd73T58mWrTxMAAPggnw2suXPnKjLyyp%2BQXVNTo8TERK9tiYmJqqqq0oULF/Txxx977Y%2BIiND3vvc9VVVVqba2VsHBwRo2bFjn/hEjRuiLL77Qn/70p2tzMgAAwK847R7gWvB4PIqOjvbaFh0drY8//liff/65Ojo6rrjf7Xarf//%2BioiIUFBQkNc%2BSXK73d06fkNDg1wul9c2p7Of4uLivsvpXFVwsEN3rNhv9Dmvpd8X3Gn3CMYFBzu8/g3rsQb2Yw3sxxr0Pn4ZWJI676f6Lvu/6Wu/SWlpqUpKSry25ebmKi8vr0fP6%2BtiYsLtHuGaiYrqa/cIAY81sB9rYD/WoPfwy8CKiYmRx%2BPx2ubxeBQbG6v%2B/fvL4XBccf91112n2NhYnT9/Xm1tbQoODu7cJ0nXXXddt46fmZmptLQ0r21OZz%2B53c3f9ZSuyNd%2BUjF9/r1BcLBDUVF91dTUora2drvHCUisgf1YA/uxBldn1w/3fhlYSUlJqq6u9tpWVVWl6dOnKzQ0VEOHDlVNTY3Gjh0rSWpqatKf//xn/cM//IMGDRqkjo4OffDBBxoxYkTn10ZFRWnIkCHdOn5cXFyXlwNdrnNqbQ3sb3p/Pv%2B2tna/Pj9fwBrYjzWwH2vQe/jWJZBumj17to4dO6bDhw/r4sWL2rFjhz755BPNnDlTkpSVlaVt27bp5MmTOn/%2BvIqKijR8%2BHCNHDlSsbGxmjJlip5//nk1Njaqvr5eGzZsUEZGhpxOv%2BxRAABgmM8Ww8iRIyVJra2tkqSDBw9K%2BvJq080336yioiIVFhaqrq5OCQkJ2rRpkwYMGCBJmjNnjlwul/7pn/5Jzc3NSk5O9rpn6qc//alWr16tyZMnq0%2BfPrr33nuv%2BGamAAAAVxLU0dM7utEtLtc548/pdDp0d9Fbxp/3Wtm3eJzdIxjndDoUExMut7uZy/I2YQ3sxxrYjzW4ugEDrvyWTteaX75ECAAAYCcCCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDACCwAAwDC/DawTJ05o7ty5uuOOOzRu3DgVFBSosbFRklRZWamMjAyNHj1a06dPV3l5udfXbtu2TVOmTNHo0aOVlZWl6upqO04BAAD4KL8MrNbWVi1YsEC33nqrjh07pt27d6uxsVFPPfWUGhoatHDhQs2ZM0eVlZVasWKFVq1apaqqKklSRUWFiouL9fOf/1zHjh3TpEmTlJOToy%2B%2B%2BMLmswIAAL7CLwPL5XLJ5XLpvvvuU0hIiGJiYnT33XertrZWu3bt0uDBg5WRkaHQ0FClpKQoLS1NZWVlkqTS0lKlp6dr1KhRCgsL0/z58yVJhw4dsvOUAACAD/HLwIqPj9fw4cNVWlqq5uZmnT17VgcOHNDEiRNVU1OjxMREr8cnJiZ2vgz49f0Oh0PDhw/vvMIFAADwTZx2D3AtOBwOFRcXKzs7W1u3bpUkjR07Vvn5%2BVq4cKHi4%2BO9Ht%2B/f3%2B53W5JksfjUXR0tNf%2B6Ojozv3d0dDQIJfL5bXN6eynuLi473I6VxUc7Ft97HT61rzd8dUa%2BNpa%2BBPWwH6sgf1Yg97HLwPr0qVLysnJ0dSpUzvvn3r66adVUFDQra/v6Ojo0fFLS0tVUlLitS03N1d5eXk9el5fFxMTbvcI10xUVF%2B7Rwh4rIH9WAP7sQa9h18GVmVlpU6fPq2lS5cqODhYkZGRysvL03333ac777xTHo/H6/Fut1uxsbGSpJiYmC77PR6Phg4d2u3jZ2ZmKi0tzWub09lPbnfzdzyjK/O1n1RMn39vEBzsUFRUXzU1taitrd3ucQISa2A/1sB%2BrMHV2fXDvV8GVltbm9rb272uRF26dEmSlJKSov/4j//wenx1dbVGjRolSUpKSlJNTY1mzZrV%2BVwnTpxQRkZGt48fFxfX5eVAl%2BucWlsD%2B5ven8%2B/ra3dr8/PF7AG9mMN7Mca9B6%2BdQmkm2677Tb169dPxcXFamlpkdvt1saNGzVmzBjdd999qqurU1lZmS5evKgjR47oyJEjmj17tiQpKytLr732mv74xz%2BqpaVFGzduVEhIiCZOnGjvSQEAAJ/hl4EVExOjF154Qe%2B%2B%2B64mTJige%2B%2B9V2FhYVq/fr2uu%2B46bdq0Sdu3b9ftt9%2BuNWvWaN26dbrlllskSRMmTNDSpUu1ePFijR07VseOHdPmzZsVFhZm81kBAABfEdTR0zu60S0u1znjz%2Bl0OnR30VvGn/da2bd4nN0jGOd0OhQTEy63u5nL8jZhDezHGtiPNbi6AQMibTmuX17BAgAAsBOBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYJjlgZWWlqaSkhKdOXPG6kMDAABYwvLAeuCBB7R3717dddddmj9/vg4cOKDW1larxwAAALhmLA%2Bs3Nxc7d27V7/97W81dOhQrVmzRqmpqVq3bp1OnTpl9TgAAADG2XYP1ogRI7Rs2TIdOnRIy5cv129/%2B1tNmzZN8%2BbN03//93/bNRYAAECP2RZYly9f1t69e/XII49o2bJlio%2BP15NPPqnhw4crOztbu3btsms0AACAHnFafcCTJ09qx44deu2119Tc3KwpU6Zo69atuv322zsfM2bMGD311FOaMWOG1eMBAAD0mOVXsKZPn67Dhw/r0Ucf1Ztvvql169Z5xZUkpaamqrGxscfH2rhxo8aPH69bb71V2dnZOn36tCSpsrJSGRkZGj16tKZPn67y8nKvr9u2bZumTJmi0aNHKysrS9XV1T2eBQAABA7LA2vbtm3at2%2BfsrOz1b9//6s%2B7v333%2B/RcV5%2B%2BWWVl5dr27ZtOnr0qBISEvTSSy%2BpoaFBCxcu1Jw5c1RZWakVK1Zo1apVqqqqkiRVVFSouLhYP//5z3Xs2DFNmjRJOTk5%2BuKLL3o0DwAACByWB9awYcOUk5OjgwcPdm576aWX9Mgjj8jj8Rg7zosvvqglS5bopptuUkREhFauXKmVK1dq165dGjx4sDIyMhQaGqqUlBSlpaWprKxMklRaWqr09HSNGjVKYWFhmj9/viTp0KFDxmYDAAD%2BzfLAKiws1Llz55SQkNC5beLEiWpvb9fatWuNHOPTTz/V6dOn9fnnn2vatGlKTk5WXl6eGhsbVVNTo8TERK/HJyYmdr4M%2BPX9DodDw4cP77zCBQAA8E0sv8n96NGj2rVrl2JiYjq3DR48WEVFRbr33nuNHKO%2Bvl6StH//fm3ZskUdHR3Ky8vTypUrdeHCBcXHx3s9vn///nK73ZIkj8ej6Ohor/3R0dGd%2B7ujoaFBLpfLa5vT2U9xcXHf5XSuKjjYtz7pyOn0rXm746s18LW18Cesgf1YA/uxBr2P5YF14cIFhYaGdtnucDjU0tJi5BgdHR2SpPnz53fG1KJFi/TII48oJSWl21//XZWWlqqkpMRrW25urvLy8nr0vL4uJibc7hGumaiovnaPEPBYA/uxBvZjDXoPywNrzJgxWrt2rfLz8zuvFH366ad69tlnu/w24Xd1/fXXS5KioqI6tw0aNEgdHR26fPlyl3u93G63YmNjJUkxMTFd9ns8Hg0dOrTbx8/MzFRaWprXNqezn9zu5m91Ht/E135SMX3%2BvUFwsENRUX3V1NSitrZ2u8cJSKyB/VgD%2B7EGV2fXD/eWB9by5cv14x//WN///vcVERGh9vZ2NTc364YbbtBvfvMbI8cYOHCgIiIiVFtbqxEjRkiS6urq1KdPH6Wmpmrnzp1ej6%2BurtaoUaMkSUlJSaqpqdGsWbMkSW1tbTpx4oQyMjK6ffy4uLguLwe6XOfU2hrY3/T%2BfP5tbe1%2BfX6%2BgDWwH2tgP9ag97A8sG644Qbt2bNHb775pv785z/L4XBoyJAhGj9%2BvIKDg40cw%2Bl0KiMjQ7/85S81ZswYRUREaMOGDZoxY4ZmzZqlf/u3f1NZWZlmzpypt99%2BW0eOHFFpaakkKSsrS0uXLtW9996rYcOG6YUXXlBISIgmTpxoZDYAAOD/LA8sSQoJCdFdd911TY%2BRn5%2BvS5cu6cEHH9Tly5c1ZcoUrVy5UuHh4dq0aZOeeeYZPf300xo0aJDWrVunW265RZI0YcIELV26VIsXL9bZs2c1cuRIbd68WWFhYdd0XgAA4D%2BCOnp6R/e39Je//EXr16/XRx99pAsXLnTZ/8Ybb1g5jmVcrnPGn9PpdOjuoreMP%2B%2B1sm/xOLtHMM7pdCgmJlxudzOX5W3CGtiPNbAfa3B1AwZE2nJcW%2B7Bamho0Pjx49WvXz%2BrDw8AAHDNWR5Y1dXVeuONNzp/aw8AAMDfWP57/tdddx1XrgAAgF%2BzPLAeffRRlZSU9PjNPAEAAHory18ifPPNN/Xuu%2B/q1Vdf1d/93d/J4fBuvFdeecXqkQAAAIyyPLAiIiI0YcIEqw8LAABgGcsDq7Cw0OpDAgAAWMqWD7P705/%2BpOLiYj355JOd29577z07RgEAADDO8sCqrKzUzJkzdeDAAe3evVvSl28%2BOnfuXL99k1EAABBYLA%2Bs5557Tj/5yU%2B0a9cuBQUFSfry8wnXrl2rDRs2WD0OAACAcZYH1v/8z/8oKytLkjoDS5KmTp2qkydPWj0OAACAcZYHVmRk5BU/g7ChoUEhISFWjwMAAGCc5YE1evRorVmzRufPn%2B/cdurUKS1btkzf//73rR4HAADAOMvfpuHJJ5/Uww8/rOTkZLW1tWn06NFqaWnR0KFDtXbtWqvHAQAAMM7ywBo4cKB2796tI0eO6NSpUwoLC9OQIUM0btw4r3uyAAAAfJXlgSVJffr00V133WXHoQEAAK45ywMrLS3t/7xSxXthAQAAX2d5YE2bNs0rsNra2nTq1ClVVVXp4YcftnocAAAA4ywPrIKCgituf/311/WHP/zB4mkAAADMs%2BWzCK/krrvu0p49e%2BweAwAAoMd6TWCdOHFCHR0ddo8BAADQY5a/RDhnzpwu21paWnTy5Endc889Vo8DAABgnOWBNXjw4C6/RRgaGqqMjAw9%2BOCDVo8DAABgnOWBxbu1AwAAf2d5YL322mvdfuz9999/DScBAAC4NiwPrBUrVqi9vb3LDe1BQUFe24KCgggsAADgkywPrF//%2Btd68cUXlZOTo2HDhqmjo0MffvihfvWrX%2BlHP/qRkpOTrR4JAADAKFvuwdq8ebPi4%2BM7t91xxx264YYbNG/ePO3evdvqkQAAAIyy/H2wPvnkE0VHR3fZHhUVpbq6OqvHAQAAMM7ywBo0aJDWrl0rt9vdua2pqUnr16/XjTfeaPU4AAAAxln%2BEuHy5cuVn5%2Bv0tJShYeHy%2BFw6Pz58woLC9OGDRusHgcAAMA4ywNr/PjxOnz4sI4cOaL6%2Bnp1dHQoPj5ed955pyIjI60eBwAAwDjLA0uS%2Bvbtq8mTJ6u%2Bvl433HCDHSMAAABcM5bfg3XhwgUtW7ZMt912m37wgx9I%2BvIerPnz56upqcnqcQAAAIyzPLDWrVun2tpaFRUVyeH438O3tbWpqKjI6nEAAACMszywXn/9df3rv/6rpk6d2vmhz1FRUSosLNSBAwesHgcAAMA4ywOrublZgwcP7rI9NjZWX3zxhdXjAAAAGGd5YN144436wx/%2BIElenz24f/9%2B/e3f/q3V4wAAABhn%2BW8R/vCHP9SiRYv0wAMPqL29XVu2bFF1dbVef/11rVixwupxAAAAjLM8sDIzM%2BV0OrV9%2B3YFBwfrl7/8pYYMGaKioiJNnTrV6nEAAACMszywGhsb9cADD%2BiBBx6w%2BtAAAACWsPwerMmTJ3vdewUAAOBvLA%2Bs5ORk7du3z%2BrDAgAAWMbylwj/5m/%2BRj/72c%2B0efNm3XjjjerTp4/X/vXr11s9EgAAgFGWB9bHH3%2Bsm266SZLkdrutPjwAAMA1Z1lgLVmyRM8995x%2B85vfdG7bsGGDcnNzrRoBAADAEpbdg1VRUdFl2%2BbNm606PAAAgGUsC6wr/eYgv00IAAD8kWWB9dUHO3/TNgAAAF9n%2Bds0AAAA%2BLuACKw1a9Zo2LBhnX%2BurKxURkaGRo8erenTp6u8vNzr8du2bdOUKVM0evRoZWVlqbq62uqRAQCAD7PstwgvX76s/Pz8b9xm%2Bn2wamtrtXPnzs4/NzQ0aOHChVqxYoVmzJihd955R4899piGDBmikSNHqqKiQsXFxfr1r3%2BtYcOGadu2bcrJydGBAwfUr18/o7MBAAD/ZNkVrNtvv10NDQ1e/1xpm0nt7e1avXq1srOzO7ft2rVLgwcPVkZGhkJDQ5WSkqK0tDSVlZVJkkpLS5Wenq5Ro0YpLCxM8%2BfPlyQdOnTI6GwAAMB/WXYF66/f/8oqr7zyikJDQzVjxgw9//zzkqSamholJiZ6PS4xMbHz43tqamo0bdq0zn0Oh0PDhw9XVVWVpk%2Bf3q3jNjQ0yOVyeW1zOvspLi6uJ6fTRXCwb73C63T61rzd8dUa%2BNpa%2BBPWwH6sgf1Yg97H8ndyt8pnn32m4uLiLmHn8XgUHx/vta1///6d7yrv8XgUHR3ttT86Ovpbvet8aWmpSkpKvLbl5uYqLy/v25yC34mJCbd7hGsmKqqv3SMEPNbAfqyB/ViD3sNvA6uwsFDp6elKSEjQ6dOnv9XX9vT9uTIzM5WWlua1zensJ7e7uUfP%2B3W%2B9pOK6fPvDYKDHYqK6qumpha1tbXbPU5AYg3sxxrYjzW4Ort%2BuPfLwKqsrNR7772n3bt3d9kXExMjj8fjtc3tdis2Nvaq%2Bz0ej4YOHdrt48fFxXV5OdDlOqfW1sD%2Bpvfn829ra/fr8/MFrIH9WAP7sQa9h29dAumm8vJynT17VpMmTVJycrLS09MlScnJybr55pu7vO1CdXW1Ro0aJUlKSkpSTU1N5762tjadOHGicz8AAMA38cvAeuKJJ/T6669r586d2rlzZ%2BdnHu7cuVMzZsxQXV2dysrKdPHiRR05ckRHjhzR7NmzJUlZWVl67bXX9Mc//lEtLS3auHGjQkJCNHHiRBvPCAAA%2BBK/fIkwOjra60b11tZWSdLAgQMlSZs2bdIzzzyjp59%2BWoMGDdK6det0yy23SJImTJigpUuXavHixTp79qxGjhypzZs3KywszPoTAQAAPimog09ctoTLdc74czqdDt1d9Jbx571W9i0eZ/cIxjmdDsXEhMvtbua%2BB5uwBvZjDezHGlzdgAGRthzXL18iBAAAsBOBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYBiBBQAAYJjfBlZdXZ1yc3OVnJyslJQUPfHEE2pqapIk1dbW6kc/%2BpFuv/123XPPPXrxxRe9vnbv3r2aMWOGbrvtNqWnp%2Bvo0aN2nAIAAPBRfhtYOTk5ioqKUkVFhV599VV99NFHevbZZ3XhwgU9%2Buij%2Bsd//Ee99dZbeu6557Rp0yYdOHBA0pfxtWzZMhUUFOjtt99Wdna2Hn/8cdXX19t8RgAAwFf4ZWA1NTUpKSlJ%2Bfn5Cg8P18CBAzVr1iwdP35chw8f1uXLl/XYY4%2BpX79%2BGjFihB588EGVlpZKksrKypSamqrU1FSFhoZq5syZuvnmm1VeXm7zWQEAAF/htHuAayEqKkqFhYVe286cOaO4uDjV1NRo2LBhCg4O7tyXmJiosrIySVJNTY1SU1O9vjYxMVFVVVXdPn5DQ4NcLpfXNqezn%2BLi4r7tqfyfgoN9q4%2BdTt%2Batzu%2BWgNfWwt/whrYjzWwH2vQ%2B/hlYH1dVVWVtm/fro0bN2rfvn2Kiory2t%2B/f395PB61t7fL4/EoOjraa390dLQ%2B/vjjbh%2BvtLRUJSUlXttyc3OVl5f33U/CD8TEhNs9wjUTFdXX7hECHmtgP9bAfqxB7%2BH3gfXOO%2B/oscceU35%2BvlJSUrRv374rPi4oKKjzvzs6Onp0zMzMTKWlpXltczr7ye1u7tHzfp2v/aRi%2Bvx7g%2BBgh6Ki%2BqqpqUVtbe12jxOQWAP7sQb2Yw2uzq4f7v06sCoqKvSTn/xEq1at0v333y9Jio2N1SeffOL1OI/Ho/79%2B8vhcCgmJkYej6fL/tjY2G4fNy4ursvLgS7XObW2BvY3vT%2Bff1tbu1%2Bfny9gDezHGtiPNeg9fOsSyLfw7rvvatmyZfrFL37RGVeSlJSUpA8//FCtra2d26qqqjRq1KjO/dXV1V7P9df7AQAAvolfBlZra6tWrlypgoICjR8/3mtfamqqIiIitHHjRrW0tOj999/Xjh07lJWVJUmaPXu2jh07psOHD%2BvixYvasWOHPvnkE82cOdOOUwEAAD4oqKOnNxz1QsePH9dDDz2kkJCQLvv279%2Bv5uZmrV69WtXV1br%2B%2Buv1yCOP6Ic//GHnYw4cOKD169errq5OCQkJWrFihcaMGdOjmVyucz36%2BitxOh26u%2Bgt4897rexbPM7uEYxzOh2KiQmX293MZXmbsAb2Yw3sxxpc3YABkbYc1y/vwbrjjjv04Ycf/p%2BP%2Bfd///er7rvnnnt0zz33mB4LAAAECL98iRAAAMBOBBYAAIBhfvkSIXqnHzz/n3aP8K344z1jAABrcAULAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMKfdAwC91Q%2Be/0%2B7R/hW9i0eZ/cIAID/jytYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAAAAhhFYAABJvBbCAAAHQklEQVQAhhFYAAAAhhFYV1BXV6cFCxYoOTlZkyZN0rp169Te3m73WAAAwEc47R6gN1q0aJFGjBihgwcP6uzZs3r00Ud1/fXX65//%2BZ/tHg0AAPgAAutrqqqq9MEHH2jLli2KjIxUZGSksrOztXXrVgILvdoPnv9Pu0dAL7Fv8Ti7RwACHoH1NTU1NRo0aJCio6M7t40YMUKnTp3S%2BfPnFRER8Y3P0dDQIJfL5bXN6eynuLg4o7MGB/MKL4CufCm2f19wp90j%2BIWv/j74%2Bt8Ldxe9Zcc434m/fS8QWF/j8XgUFRXlte2r2HK73d0KrNLSUpWUlHhte/zxx7Vo0SJzg%2BrLkHt44EfKzMw0Hm/onoaGBpWWlrIGNmIN7Mca2K%2BhoUFbt/66yxoc/9lUG6cKbFwCuYKOjo4efX1mZqZeffVVr38yMzMNTfe/XC6XSkpKulwtg3VYA/uxBvZjDezHGvQ%2BXMH6mtjYWHk8Hq9tHo9HQUFBio2N7dZzxMXF8VMcAAABjCtYX5OUlKQzZ86osbGxc1tVVZUSEhIUHh5u42QAAMBXEFhfk5iYqJEjR2r9%2BvU6f/68Tp48qS1btigrK8vu0QAAgI8Ifuqpp56ye4je5s4779Tu3bv1L//yL9qzZ48yMjI0b948BQUF2T1aF%2BHh4Ro7dixX12zEGtiPNbAfa2A/1qB3Cero6R3dAAAA8MJLhAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWD6orq5OCxYsUHJysiZNmqR169apvb3d7rECTl1dnXJzc5WcnKyUlBQ98cQTampqsnusgLRmzRoNGzbM7jEC1saNGzV%2B/Hjdeuutys7O1unTp%2B0eKWCcOHFCc%2BfO1R133KFx48apoKBAjY2Ndo8FEVg%2BadGiRYqPj9fBgwe1ZcsWHTx4UFu3brV7rICTk5OjqKgoVVRU6NVXX9VHH32kZ5991u6xAk5tba127txp9xgB6%2BWXX1Z5ebm2bdumo0ePKiEhQS%2B99JLdYwWE1tZWLViwQLfeequOHTum3bt3q7GxUXzEcO9AYPmYqqoqffDBByooKFBkZKQGDx6s7OxslZaW2j1aQGlqalJSUpLy8/MVHh6ugQMHatasWTp%2B/LjdowWU9vZ2rV69WtnZ2XaPErBefPFFLVmyRDfddJMiIiK0cuVKrVy50u6xAoLL5ZLL5dJ9992nkJAQxcTE6O6771Ztba3do0EEls%2BpqanRoEGDFB0d3bltxIgROnXqlM6fP2/jZIElKipKhYWFuv766zu3nTlzRnFxcTZOFXheeeUVhYaGasaMGXaPEpA%2B/fRTnT59Wp9//rmmTZum5ORk5eXl8RKVReLj4zV8%2BHCVlpaqublZZ8%2Be1YEDBzRx4kS7R4MILJ/j8XgUFRXlte2r2HK73XaMBH15ZXH79u167LHH7B4lYHz22WcqLi7W6tWr7R4lYNXX10uS9u/fry1btmjnzp2qr6/nCpZFHA6HiouL9cYbb2j06NFKSUlRa2ur8vPz7R4NIrB8UkdHh90j4K%2B88847mjdvnvLz85WSkmL3OAGjsLBQ6enpSkhIsHuUgPXV/4vmz5%2Bv%2BPh4DRw4UIsWLVJFRYUuXrxo83T%2B79KlS8rJydHUqVN1/Phxvfnmm4qMjFRBQYHdo0EEls%2BJjY2Vx%2BPx2ubxeBQUFKTY2FibpgpcFRUVWrBggZYvX665c%2BfaPU7AqKys1Hvvvafc3Fy7RwloX71E/tdX1QcNGqSOjg6dPXvWrrECRmVlpU6fPq2lS5cqMjJS8fHxysvL0%2B9///suf0/AegSWj0lKStKZM2e87nGoqqpSQkKCwsPDbZws8Lz77rtatmyZfvGLX%2Bj%2B%2B%2B%2B3e5yAUl5errNnz2rSpElKTk5Wenq6JCk5OVl79uyxebrAMXDgQEVERHjdVF1XV6c%2BffpwP6IF2tra1N7e7vWqxqVLl2ycCH8tqIPXm3zO7NmzNXToUD355JP69NNPtWDBAv34xz/WQw89ZPdoAaO1tVUzZ87Uww8/rMzMTLvHCTiff/65WlpaOv9cX1%2BvzMxMHTlyRNHR0erbt6%2BN0wWWwsJCvfHGG3rhhRcUERGh3NxcDRkyRIWFhXaP5vfcbremTp2qOXPmKCcnRxcuXNDy5ct17tw5bd%2B%2B3e7xAh6B5YPq6%2Bu1atUq/dd//ZciIiI0Z84cPf744woKCrJ7tIBx/PhxPfTQQwoJCemyb//%2B/Ro0aJANUwWu06dPa/Lkyfrwww/tHiXgXLp0SYWFhdqzZ48uX76sKVOmaNWqVVxRt0h1dbWeffZZffDBBwoJCdHYsWP1xBNPKD4%2B3u7RAh6BBQAAYBj3YAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABhGYAEAABj2/wB%2BkoQn6iEOHwAAAABJRU5ErkJggg%3D%3D"/>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12" id="common8522789940792607072">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0</td>
        <td class="number">1002</td>
        <td class="number">76.5%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1</td>
        <td class="number">170</td>
        <td class="number">13.0%</td>
        <td>
            <div class="bar" style="width:17%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">113</td>
        <td class="number">8.6%</td>
        <td>
            <div class="bar" style="width:12%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">5</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">9</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">6</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12"  id="extreme8522789940792607072">
            <p class="h4">Minimum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0</td>
        <td class="number">1002</td>
        <td class="number">76.5%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1</td>
        <td class="number">170</td>
        <td class="number">13.0%</td>
        <td>
            <div class="bar" style="width:17%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">113</td>
        <td class="number">8.6%</td>
        <td>
            <div class="bar" style="width:12%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr>
</table>
            <p class="h4">Maximum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">3</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:75%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">5</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:75%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">6</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:25%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">9</td>
        <td class="number">2</td>
        <td class="number">0.2%</td>
        <td>
            <div class="bar" style="width:25%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
    </div>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_pclass">pclass<br/>
            <small>Numeric</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Distinct count</th>
                    <td>3</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>0.2%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (n)</th>
                    <td>0</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (n)</th>
                    <td>0</td>
                </tr>
            </table>

        </div>
        <div class="col-sm-6">
            <table class="stats ">

                <tr>
                    <th>Mean</th>
                    <td>2.2949</td>
                </tr>
                <tr>
                    <th>Minimum</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th>Maximum</th>
                    <td>3</td>
                </tr>
                <tr class="ignore">
                    <th>Zeros (%)</th>
                    <td>0.0%</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minihistogram-8665591789917202290">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAAQtJREFUeJzt3MEJAkEQAEEVQzIIc/JtTgZhTmMC0qAgt5xV/4X5NDOvPc7MHIC3TlsPACs7bz0A%2B3W5PT5%2B87xffzDJ92wQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCMv9rLiH3/jYDxsEgkAgLHdi/Tsn5lpsEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIx5mZrYeAVdkgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEF7/3RGT0dEIxAAAAABJRU5ErkJggg%3D%3D">

</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#descriptives-8665591789917202290,#minihistogram-8665591789917202290"
       aria-expanded="false" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="row collapse col-md-12" id="descriptives-8665591789917202290">
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#quantiles-8665591789917202290"
                                                  aria-controls="quantiles-8665591789917202290" role="tab"
                                                  data-toggle="tab">Statistics</a></li>
        <li role="presentation"><a href="#histogram-8665591789917202290" aria-controls="histogram-8665591789917202290"
                                   role="tab" data-toggle="tab">Histogram</a></li>
        <li role="presentation"><a href="#common-8665591789917202290" aria-controls="common-8665591789917202290"
                                   role="tab" data-toggle="tab">Common Values</a></li>
        <li role="presentation"><a href="#extreme-8665591789917202290" aria-controls="extreme-8665591789917202290"
                                   role="tab" data-toggle="tab">Extreme Values</a></li>

    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active row" id="quantiles-8665591789917202290">
            <div class="col-md-4 col-md-offset-1">
                <p class="h4">Quantile statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Minimum</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>5-th percentile</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>Q1</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>Median</th>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>Q3</th>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>95-th percentile</th>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>Maximum</th>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>Interquartile range</th>
                        <td>1</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4 col-md-offset-2">
                <p class="h4">Descriptive statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Standard deviation</th>
                        <td>0.83784</td>
                    </tr>
                    <tr>
                        <th>Coef of variation</th>
                        <td>0.36509</td>
                    </tr>
                    <tr>
                        <th>Kurtosis</th>
                        <td>-1.3151</td>
                    </tr>
                    <tr>
                        <th>Mean</th>
                        <td>2.2949</td>
                    </tr>
                    <tr>
                        <th>MAD</th>
                        <td>0.76383</td>
                    </tr>
                    <tr class="">
                        <th>Skewness</th>
                        <td>-0.59865</td>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>3004</td>
                    </tr>
                    <tr>
                        <th>Variance</th>
                        <td>0.70197</td>
                    </tr>
                    <tr>
                        <th>Memory size</th>
                        <td>10.3 KiB</td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane col-md-8 col-md-offset-2" id="histogram-8665591789917202290">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzt3X1clfXBx/EvDwIq8mSizly4VBQhpmkUOVE0LU1WpCK%2BWrmy%2BUAxUUsTt7QoberdSrxV1myxvBvDmk9T8y4fVov2am62A9qDD81iGoQcEUMUuO4/fHnujqgc9IJzztXn/Xr5Mn6/61zn9/XqOn69rsPBxzAMQwAAADCNr7sXAAAAYDUULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAEzm7%2B4FfFeUl58yfZ%2B%2Bvj6KiGivEydOq6HBMH3/7mLVXJJ1s1k1l0Q2b2TVXJJ1s7Vkrk6dOpi6P1dxBcuL%2Bfr6yMfHR76%2BPu5eiqmsmkuybjar5pLI5o2smkuybjYr5qJgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyChYAAIDJKFgAAAAmo2ABAACYjIIFAABgMgoWAACAyShYAAAAJqNgAQAAmMzf3QtoCR9%2B%2BKEeeughpzHDMHTu3Dl98sknKioq0vLly3X48GF17dpVU6dOVUpKimPb/Px8rVu3TuXl5YqOjlZ2drZiY2NbOwYAANfkrl//1d1LcNnfn73T3UswlSUL1qBBg2Sz2ZzGVq9erY8//lhlZWWaMWOGsrOzNXbsWO3du1fTp09Xjx49FBcXp507d2rFihV6%2BeWXFR0drfz8fE2bNk07duxQu3bt3JQIAAB4k%2B/ELcL//Oc/euWVV/TEE09o8%2BbNioqK0rhx4xQYGKjExEQlJyersLBQklRQUKDU1FTFx8crKChIU6ZMkSTt2rXLnREAAIAXseQVrIu9%2BOKLuu%2B%2B%2B/S9731PJSUliomJcZqPiYnRtm3bJEklJSUaPXq0Y87X11d9%2B/aVzWbTmDFjXHq%2BsrIylZeXO435%2B7dTZGTkNSZx5ufn6/S7VVg1l2TdbFbNJZHNG1k1l2TtbJK1clm%2BYH355ZfasWOHduzYIUmy2%2B3q3Lmz0zZhYWGqrKx0zIeGhjrNh4aGOuZdUVBQoNzcXKexjIwMZWZmXk2EJoWEtG2R/bqbVXNJ1s1m1VwS2byRVXNJ1s1mpVyWL1jr1q3TyJEj1alTJ5cfYxjGNT1nWlqakpOTncb8/dupsvL0Ne33Yn5%2BvgoJaauqqhrV1zeYum93smouybrZrJpLIps3smouydrZJLVIrvDw9qbuz1WWL1hvvfWW5s6d6/g6PDxcdrvdaZvKykpFRERcdt5ut6tXr14uP2dkZGSj24Hl5adUV9cyJ0N9fUOL7dudrJpLsm42q%2BaSyOaNrJpLsm42K%2BWyzs3OSzhw4IBKS0t1%2B%2B23O8bi4uJUXFzstF1xcbHi4%2BMlSbGxsSopKXHM1dfXa//%2B/Y55AACApli6YO3fv19hYWEKDg52jI0dO1alpaUqLCxUbW2t9uzZoz179mjChAmSpPT0dG3YsEH79u1TTU2NVq1apYCAAA0dOtRNKQAAgLex9C3Cr7/%2ButF7rzp27Kg1a9YoJydHixYtUrdu3bR06VL16dNHkjRkyBDNmjVLM2fOVEVFheLi4pSXl6egoCB3RAAAAF7Ix7jWd3TDJeXlp0zfp7%2B/r8LD26uy8rRl7llL1s0lWTebVXNJZPNGVs0lNT%2Bbt32Se0scs06dOpi6P1dZ%2BhYhAACAO1CwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkli5Yq1at0uDBg/XDH/5QkydP1pdffilJKioq0rhx4zRgwACNGTNGmzZtcnpcfn6%2BRo0apQEDBig9PV3FxcXuWD4AAPBSli1Y69at06ZNm5Sfn6/33ntPPXv21O9%2B9zuVlZVpxowZmjhxooqKipSdna1f/OIXstlskqSdO3dqxYoV%2BtWvfqX3339fw4YN07Rp0/TNN9%2B4OREAAPAWli1Ya9euVVZWln7wgx8oODhYCxYs0IIFC7R582ZFRUVp3LhxCgwMVGJiopKTk1VYWChJKigoUGpqquLj4xUUFKQpU6ZIknbt2uXOOAAAwIv4u3sBLeGrr77Sl19%2BqZMnT2r06NGqqKhQQkKCFi5cqJKSEsXExDhtHxMTo23btkmSSkpKNHr0aMecr6%2Bv%2BvbtK5vNpjFjxrj0/GVlZSovL3ca8/dvp8jIyGtM5szPz9fpd6uwai7Jutmsmksimzeyai7J2tkka%2BWyZME6fvy4JGn79u165ZVXZBiGMjMztWDBAp05c0adO3d22j4sLEyVlZWSJLvdrtDQUKf50NBQx7wrCgoKlJub6zSWkZGhzMzMq4nTpJCQti2yX3ezai7Jutmsmksimzeyai7JutmslMuSBcswDEnSlClTHGXqscce0yOPPKLExESXH3%2B10tLSlJyc7DTm799OlZWnr2m/F/Pz81VISFtVVdWovr7B1H27k1VzSdbNZtVcEtm8kVVzSdbOJqlFcoWHtzd1f66yZMG67rrrJEkhISGOsW7duskwDJ07d052u91p%2B8rKSkVEREiSwsPDG83b7Xb16tXL5eePjIxsdDuwvPyU6upa5mSor29osX27k1VzSdbNZtVcEtm8kVVzSdbNZqVc1rnZ%2BS1dunRRcHCwDhw44BgrLS1VmzZtlJSU1OhjF4qLixUfHy9Jio2NVUlJiWOuvr5e%2B/fvd8wDAAA0xZIFy9/fX%2BPGjdPq1av173//WxUVFVq5cqXGjh2re%2B%2B9V6WlpSosLFRtba327NmjPXv2aMKECZKk9PR0bdiwQfv27VNNTY1WrVqlgIAADR061L2hAACA17DkLUJJmj17ts6ePavx48fr3LlzGjVqlBYsWKD27dtrzZo1ysnJ0aJFi9StWzctXbpUffr0kSQNGTJEs2bN0syZM1VRUaG4uDjl5eUpKCjIzYkAAIC38DGu9R3dcEl5%2BSnT9%2Bnv76vw8PaqrDxtmXvWknVzSdbNZtVcEtm8kVVzSc3Pdtev/9oKqzLH35%2B9s0WOWadOHUzdn6sseYsQAADAnShYAAAAJqNgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyChYAAIDJKFgAAAAmo2ABAACYjIIFAABgMgoWAACAyShYAAAAJqNgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyChYAAIDJKFgAAAAmo2ABAACYjIIFAABgMgoWAACAyShYAAAAJqNgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyyxas6OhoxcbGKi4uzvHrmWeekSQVFRVp3LhxGjBggMaMGaNNmzY5PTY/P1%2BjRo3SgAEDlJ6eruLiYndEAAAAXsrf3QtoSdu3b9f111/vNFZWVqYZM2YoOztbY8eO1d69ezV9%2BnT16NFDcXFx2rlzp1asWKGXX35Z0dHRys/P17Rp07Rjxw61a9fOTUkAAIA3sewVrMvZvHmzoqKiNG7cOAUGBioxMVHJyckqLCyUJBUUFCg1NVXx8fEKCgrSlClTJEm7du1y57IBAIAXsfQVrOXLl%2Buf//ynqqurddddd2nevHkqKSlRTEyM03YxMTHatm2bJKmkpESjR492zPn6%2Bqpv376y2WwaM2aMS89bVlam8vJypzF//3aKjIy8xkTO/Px8nX63Cqvmkqybzaq5JLJ5I6vmkqydTbJWLssWrB/%2B8IdKTEzU888/ry%2B%2B%2BEIzZ87UokWLZLfb1blzZ6dtw8LCVFlZKUmy2%2B0KDQ11mg8NDXXMu6KgoEC5ublOYxkZGcrMzLzKNFcWEtK2RfbrblbNJVk3m1VzSWTzRlbNJVk3m5VyWbZgFRQUOP77xhtv1Jw5czR9%2BnTdfPPNTT7WMIxreu60tDQlJyc7jfn7t1Nl5elr2u/F/Px8FRLSVlVVNaqvbzB13%2B5k1VySdbNZNZdENm9k1VyStbNJapFc4eHtTd2fqyxbsC52/fXXq76%2BXr6%2BvrLb7U5zlZWVioiIkCSFh4c3mrfb7erVq5fLzxUZGdnodmB5%2BSnV1bXMyVBf39Bi%2B3Ynq%2BaSrJvNqrkksnkjq%2BaSrJvNSrmsc7PzW/bv368lS5Y4jR06dEgBAQFKSkpq9LELxcXFio%2BPlyTFxsaqpKTEMVdfX6/9%2B/c75gEAAJpiyYLVsWNHFRQUKC8vT2fPntWRI0f04osvKi0tTT/%2B8Y9VWlqqwsJC1dbWas%2BePdqzZ48mTJggSUpPT9eGDRu0b98%2B1dTUaNWqVQoICNDQoUPdGwoAAHgNS94i7Ny5s/Ly8rR8%2BXJHQbr33nuVlZWlwMBArVmzRjk5OVq0aJG6deumpUuXqk%2BfPpKkIUOGaNasWZo5c6YqKioUFxenvLw8BQUFuTkVAADwFpYsWJI0aNAg/eEPf7js3MaNGy/72EmTJmnSpEkttTQAAGBxlrxFCAAA4E4ULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAEzmcQUrOTlZubm5OnbsmLuXAgAAcFU8rmDdd9992rp1q0aMGKEpU6Zox44dqqurc/eyAAAAXOZxBSsjI0Nbt27VH//4R/Xq1UvPPfeckpKStHTpUh05csTdywMAAGiSxxWsC/r166e5c%2Bdq165dmj9/vv74xz9q9OjRevjhh/Wvf/3L3csDAAC4LI8tWOfOndPWrVv1yCOPaO7cuercubOefPJJ9e3bV5MnT9bmzZvdvUQAAIBL8nf3Ai526NAhrV%2B/Xhs2bNDp06c1atQovfrqq7r55psd2wwaNEgLFy7U2LFj3bhSAACAS/O4gjVmzBj16NFDU6dO1T333KOwsLBG2yQlJenEiRNuWB0AAEDTPK5g5efn65Zbbmlyu48%2B%2BqgVVgMAANB8HvcerOjoaE2bNk1vv/22Y%2Bx3v/udHnnkEdntdjeuDAAAwDUeV7AWL16sU6dOqWfPno6xoUOHqqGhQUuWLHHjygAAAFzjcbcI33vvPW3evFnh4eGOsaioKC1btkx33323G1cGAADgGo%2B7gnXmzBkFBgY2Gvf19VVNTY0bVgQAANA8HlewBg0apCVLlujkyZOOsa%2B%2B%2BkqLFi1y%2BqgGAAAAT%2BVxtwjnz5%2Bvhx56SLfddpuCg4PV0NCg06dPq3v37vr973/v7uUBAAA0yeMKVvfu3fXnP/9Zf/nLX3T06FH5%2BvqqR48eGjx4sPz8/Ny9PAAAgCZ5XMGSpICAAI0YMcLdywAAALgqHlewvvjiCy1fvlyfffaZzpw502j%2BnXfeccOqAAAAXOdxBWv%2B/PkqKyvT4MGD1a5dO1P2%2Bdxzz%2BnVV1/VJ598IkkqKirS8uXLdfjwYXXt2lVTp05VSkqKY/v8/HytW7dO5eXlio6OVnZ2tmJjY01ZCwAAsD6PK1jFxcV65513FBERYcr%2BDhw4oI0bNzq%2BLisr04wZM5Sdna2xY8dq7969mj59unr06KG4uDjt3LlTK1as0Msvv6zo6Gjl5%2Bdr2rRp2rFjh2mFDwAAWJvHfUxDx44dTSsyDQ0NeuqppzR58mTH2ObNmxUVFaVx48YpMDBQiYmJSk5OVmFhoSSpoKBAqampio%2BPV1BQkKZMmSJJ2rVrlylrAgAA1udxV7CmTp2q3NxczZ49Wz4%2BPte0rz/84Q8KDAzU2LFj9etf/1qSVFJSopiYGKftYmJitG3bNsf86NGjHXO%2Bvr7q27evbDabxowZ49LzlpWVqby83GnM37%2BdIiMjryVOI35%2Bvk6/W4VVc0nWzWbVXBLZvJFVc0nWziZZK5fHFay//OUv%2Bsc//qE333xT119/vXx9nf%2Bw//CHP7i0n6%2B//lorVqxo9NlZdrtdnTt3dhoLCwtTZWWlYz40NNRpPjQ01DHvioKCAuXm5jqNZWRkKDMz0%2BV9NEdISNsW2a%2B7WTWXZN1sVs0lkc0bWTWXZN1sVsrlcQUrODhYQ4YMueb9LF68WKmpqerZs6e%2B/PLLZj3WMIxreu60tDQlJyc7jfn7t1Nl5elr2u/F/Px8FRLSVlVVNaqvbzB13%2B5k1VySdbNZNZdENm9k1VyStbNJapFc4eHtTd2fqzyuYC1evPia91FUVKR//vOf2rJlS6O58PBw2e12p7HKykrHm%2BovNW%2B329WrVy%2BXnz8yMrLR7cDy8lOqq2uZk6G%2BvqHF9u1OVs0lWTebVXNJZPNGVs0lWTeblXJ55M3Ow4cPa8WKFXryyScdY//85z9dfvymTZtUUVGhYcOGKSEhQampqZKkhIQE9e7dW8XFxU7bFxcXKz4%2BXpIUGxurkpISx1x9fb3279/vmAcAAGiKxxWsoqIipaSkaMeOHY4rUF988YUeeOABlz9kdN68eXrrrbe0ceNGbdy4UXl5eZKkjRs3auzYsSotLVVhYaFqa2u1Z88e7dmzRxMmTJAkpaena8OGDdq3b59qamq0atUqBQQEaOjQoS2SFwAAWI/H3SJ84YUX9Pjjj%2BvBBx/UTTfdJOn8zydcsmSJVq5cqeHDhze5j9DQUKc3qtfV1UmSunTpIklas2aNcnJytGjRInXr1k1Lly5Vnz59JElDhgzRrFmzNHPmTFVUVCguLk55eXkKCgoyOyoAALAojytYn376qV577TVJcvqYhjvvvFPz58%2B/qn1ef/31jk9xl6RBgwY5ffjoxSZNmqRJkyZd1XMBAAB43C3CDh06XPJnEJaVlSkgIMANKwIAAGgejytYAwYM0HPPPafq6mrH2JEjRzR37lzddtttblwZAACAazzuFuGTTz6pBx98UAkJCaqvr9eAAQNUU1OjXr16acmSJe5eHgAAQJM8rmB16dJFW7Zs0Z49e3TkyBEFBQWpR48euv3226/5R%2BcAAAC0Bo8rWJLUpk0bjRgxwt3LAAAAuCoeV7CSk5OveKXK1c/CAgAAcBePK1ijR492Klj19fU6cuSIbDabHnzwQTeuDAAAwDUeV7DmzJlzyfG33npLf/vb31p5NQAAAM3ncR/TcDkjRozQn//8Z3cvAwAAoEleU7D2798vwzDcvQwAAIAmedwtwokTJzYaq6mp0aFDhzRy5Eg3rAgAAKB5PK5gRUVFNfouwsDAQI0bN07jx49306oAAABc53EFi09rBwAA3s7jCtaGDRtc3vaee%2B5pwZUAAABcHY8rWNnZ2WpoaGj0hnYfHx%2BnMR8fHwoWAADwSB5XsF5%2B%2BWWtXbtW06ZNU3R0tAzD0CeffKLf/OY3uv/%2B%2B5WQkODuJQIAAFyRxxWsJUuWKC8vT507d3aMDRw4UN27d9fDDz%2BsLVu2uHF1AAAATfO4z8H6/PPPFRoa2mg8JCREpaWlblgRAABA83hcwerWrZuWLFmiyspKx1hVVZWWL1%2Bu73//%2B25cGQAAgGs87hbh/PnzNXv2bBUUFKh9%2B/by9fVVdXW1goKCtHLlSncvDwAAoEkeV7AGDx6s3bt3a8%2BePTp%2B/LgMw1Dnzp31ox/9SB06dHD38gAAAJrkcQVLktq2bavhw4fr%2BPHj6t69u7uXAwAA0Cwe9x6sM2fOaO7cuerfv7/uuusuSeffgzVlyhRVVVW5eXUAAABN87iCtXTpUh04cEDLli2Tr%2B//L6%2B%2Bvl7Lli1z48oAAABc43EF66233tJLL72kO%2B%2B80/FDn0NCQrR48WLt2LHDzasDAABomscVrNOnTysqKqrReEREhL755pvWXxAAAEAzedyb3L///e/rb3/7mxISEpx%2B9uD27dv1ve99z40r80wDs7e7ewku2zbzdncvAQCAVuFxBWvSpEl67LHHdN9996mhoUGvvPKKiouL9dZbbyk7O9vdywMAAGiSxxWstLQ0%2Bfv767XXXpOfn59Wr16tHj16aNmyZbrzzjvdvTwAAIAmeVzBOnHihO677z7dd9997l4KAADAVfG4N7kPHz7c6b1XAAAA3sbjClZCQoK2bdvm7mUAAABcNY%2B7Rdi1a1c9%2B%2ByzysvL0/e//321adPGaX758uUu7efjjz/W4sWLVVxcrMDAQN1yyy3Kzs5Wp06dVFRUpOXLl%2Bvw4cPq2rWrpk6dqpSUFMdj8/PztW7dOpWXlys6OlrZ2dmKjY01NScAALAuj7uCdfDgQf3gBz9Qhw4dVFlZqbKyMqdfrjh79qweeugh3XLLLSoqKtKWLVtUUVGhhQsXqqysTDNmzNDEiRNVVFSk7Oxs/eIXv5DNZpMk7dy5UytWrNCvfvUrvf/%2B%2Bxo2bJimTZvGZ3ABAACXecwVrKysLL3wwgv6/e9/7xhbuXKlMjIymr2vmpoaZWVl6d5775W/v78iIiJ0xx136LXXXtPmzZsVFRWlcePGSZISExOVnJyswsJCxcXFqaCgQKmpqYqPj5ckTZkyRfn5%2Bdq1a5fGjBljTlgAAGBpHlOwdu7c2WgsLy/vqgpWaGioxo8f7/j68OHD%2BtOf/qS77rpLJSUliomJcdo%2BJibG8b6vkpISjR492jHn6%2Burvn37ymazuVywysrKVF5e7jTm799OkZGRzc5yJX5%2BHncB8or8/V1b74Vc3pbPFVbNZtVcEtm8kVVzSdbOJlkrl8cUrEt95%2BC1fjdhaWmpRo0apbq6Ok2YMEGZmZl65JFH1LlzZ6ftwsLCVFlZKUmy2%2B0KDQ11mg8NDXXMu6KgoEC5ublOYxkZGcrMzLzKJNYQHt6%2BWduHhLRtoZW4n1WzWTWXRDZvZNVcknWzWSmXxxSsCz/Yuamx5ujWrZtsNpv%2B/e9/65e//KWeeOIJlx53rcUuLS1NycnJTmP%2B/u1UWXn6mvZ7MW9r%2Bq7m9/PzVUhIW1VV1ai%2BvqGFV9W6rJrNqrkksnkjq%2BaSrJ1NUovkau4/7s3iMQWrpfj4%2BCgqKkpZWVmaOHGikpKSZLfbnbaprKxURESEJCk8PLzRvN1uV69evVx%2BzsjIyEa3A8vLT6muznonQ3M0N399fYNl/8ysms2quSSyeSOr5pKsm81KubzrEoiLioqKNGrUKDU0/P9B8vU9H/Wmm25ScXGx0/bFxcWON7XHxsaqpKTEMVdfX6/9%2B/c75gEAAJriMVewzp07p9mzZzc55srnYMXGxqq6ulpLly5VZmamampqtGLFCg0cOFDp6elau3atCgsLlZKSog8%2B%2BEB79uxRQUGBJCk9PV2zZs3S3XffrejoaP32t79VQECAhg4dalpWAABgbR5TsG6%2B%2BeZGn3N1qTFXdOjQQWvXrlVOTo5uvfVWtWvXTrfeequeffZZdezYUWvWrFFOTo4WLVqkbt26aenSperTp48kaciQIZo1a5ZmzpypiooKxcXFKS8vT0FBQabkBAAA1ucxBevbn39lhujo6Mvuc9CgQdq4ceNlHztp0iRNmjTJ1PUAAIDvDku%2BBwsAAMCdKFgAAAAmo2ABAACYzGPegwUAnmpg9nZ3L6FZts283d1LAL7zuIIFAABgMgoWAACAyShYAAAAJqNgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyChYAAIDJKFgAAAAmo2ABAACYjIIFAABgMgoWAACAyShYAAAAJqNgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyChYAAIDJKFgAAAAmo2ABAACYjIIFAABgMgoWAACAyShYAAAAJqNgAQAAmMyyBau0tFQZGRlKSEhQYmKi5s2bp6qqKknSgQMHdP/99%2Bvmm2/WyJEjtXbtWqfHbt26VWPHjlX//v2Vmpqq9957zx0RAACAl7JswZo2bZpCQkK0c%2BdOvfnmm/rss8/0/PPP68yZM5o6dapuvfVWvfvuu3rhhRe0Zs0a7dixQ9L58jV37lzNmTNHH3zwgSZPnqxHH31Ux48fd3MiAADgLSxZsKqqqhQbG6vZs2erffv26tKli%2B699179/e9/1%2B7du3Xu3DlNnz5d7dq1U79%2B/TR%2B/HgVFBRIkgoLC5WUlKSkpCQFBgYqJSVFvXv31qZNm9ycCgAAeAt/dy%2BgJYSEhGjx4sVOY8eOHVNkZKRKSkoUHR0tPz8/x1xMTIwKCwslSSUlJUpKSnJ6bExMjGw2m8vPX1ZWpvLycqcxf/92ioyMbG6UK/Lz865%2B7O/v2nov5PK2fK6wajar5pK8M9N3/Vyzai7J2tkka%2BWyZMG6mM1m02uvvaZVq1Zp27ZtCgkJcZoPCwuT3W5XQ0OD7Ha7QkNDneZDQ0N18OBBl5%2BvoKBAubm5TmMZGRnKzMy8%2BhAWEB7evlnbh4S0baGVuJ9Vs1k1l7fhXDvPqrkk62azUi7LF6y9e/dq%2BvTpmj17thITE7Vt27ZLbufj4%2BP4b8Mwruk509LSlJyc7DTm799OlZWnr2m/F/O2pu9qfj8/X4WEtFVVVY3q6xtaeFWty6rZrJpL8r7zTOJcs2ouydrZJLVIrub%2Bg8Msli5YO3fu1OOPP65f/OIXuueeeyRJERER%2Bvzzz522s9vtCgsLk6%2Bvr8LDw2W32xvNR0REuPxpFXPyAAAV8UlEQVS8kZGRjW4HlpefUl2d9U6G5mhu/vr6Bsv%2BmVk1m1VzeRvOtfOsmkuybjYr5fK%2Bf5q56B//%2BIfmzp2rF1980VGuJCk2NlaffPKJ6urqHGM2m03x8fGO%2BeLiYqd9fXseAACgKZYsWHV1dVqwYIHmzJmjwYMHO80lJSUpODhYq1atUk1NjT766COtX79e6enpkqQJEybo/fff1%2B7du1VbW6v169fr888/V0pKijuiAAAAL2TJW4T79u3ToUOHlJOTo5ycHKe57du3a/Xq1XrqqaeUl5en6667TllZWRo6dKgkqXfv3lq2bJkWL16s0tJS9ezZU2vWrFGnTp3ckAQAAHgjSxasgQMH6pNPPrniNq%2B//vpl50aOHKmRI0eavSwAAPAdYclbhAAAAO5EwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1m2YL377rtKTExUVlZWo7mtW7dq7Nix6t%2B/v1JTU/Xee%2B855hoaGvTCCy9o%2BPDhGjRokB5%2B%2BGF98cUXrbl0AADg5SxZsH7zm98oJydHN9xwQ6O5AwcOaO7cuZozZ44%2B%2BOADTZ48WY8%2B%2BqiOHz8uSVq3bp02b96svLw87dq1S1FRUcrIyJBhGK0dAwAAeClLFqzAwECtX7/%2BkgWrsLBQSUlJSkpKUmBgoFJSUtS7d29t2rRJklRQUKDJkyfrxhtvVHBwsLKysnTo0CF99NFHrR0DAAB4KX93L6AlPPDAA5edKykpUVJSktNYTEyMbDabzpw5o4MHDyomJsYxFxwcrBtuuEE2m00//OEPXXr%2BsrIylZeXO435%2B7dTZGRkM1I0zc/Pu/qxv79r672Qy9vyucKq2ayaS/LOTN/1c82quSRrZ5OslcuSBetK7Ha7QkNDncZCQ0N18OBBnTx5UoZhXHK%2BsrLS5ecoKChQbm6u01hGRoYyMzOvfuEWEB7evlnbh4S0baGVuJ9Vs1k1l7fhXDvPqrkk62azUq7vXMGS1OT7qa71/VZpaWlKTk52GvP3b6fKytPXtN%2BLeVvTdzW/n5%2BvQkLaqqqqRvX1DS28qtZl1WxWzSV533kmca5ZNZdk7WySWiRXc//BYZbvXMEKDw%2BX3W53GrPb7YqIiFBYWJh8fX0vOd%2BxY0eXnyMyMrLR7cDy8lOqq7PeydAczc1fX99g2T8zq2azai5vw7l2nlVzSdbNZqVc3vdPs2sUGxur4uJipzGbzab4%2BHgFBgaqV69eKikpccxVVVXp6NGjuummm1p7qQAAwEt95wrWhAkT9P7772v37t2qra3V%2BvXr9fnnnyslJUWSlJ6ervz8fB06dEjV1dVatmyZ%2Bvbtq7i4ODevHAAAeAtL3iK8UIbq6uokSW%2B//bak81eqevfurWXLlmnx4sUqLS1Vz549tWbNGnXq1EmSNHHiRJWXl%2BsnP/mJTp8%2BrYSEhEZvWAcAALgSSxYsm812xfmRI0dq5MiRl5zz8fFRZmbmd/47/gAAwNX7zt0iBAAAaGkULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACTUbAAAABMRsECAAAwGQXrEkpLS/Wzn/1MCQkJGjZsmJYuXaqGhgZ3LwsAAHgJf3cvwBM99thj6tevn95%2B%2B21VVFRo6tSpuu666/TTn/7U3UsDAABegCtYF7HZbPr44481Z84cdejQQVFRUZo8ebIKCgrcvTQAAOAluIJ1kZKSEnXr1k2hoaGOsX79%2BunIkSOqrq5WcHBwk/soKytTeXm505i/fztFRkaaulY/P%2B/qx/7%2Brq33Qi5vy%2BcKq2azai7JOzN91881q%2BaSrJ1NslYuCtZF7Ha7QkJCnMYulK3KykqXClZBQYFyc3Odxh599FE99thj5i1U54vcg10%2BU1pamunlzZ3Kysr06qsvWy6XZN1sVs0lWfc8k6x73KyaS2p%2Btr8/e2crrOralZWVacWKFZY6ZtapiiYyDOOaHp%2BWlqY333zT6VdaWppJq/t/5eXlys3NbXS1zNtZNZdk3WxWzSWRzRtZNZdk3WxWzMUVrItERETIbrc7jdntdvn4%2BCgiIsKlfURGRlqmgQMAgObjCtZFYmNjdezYMZ04ccIxZrPZ1LNnT7Vv396NKwMAAN6CgnWRmJgYxcXFafny5aqurtahQ4f0yiuvKD093d1LAwAAXsJv4cKFC929CE/zox/9SFu2bNEzzzyjP//5zxo3bpwefvhh%2Bfj4uHtpjbRv31633HKL5a6uWTWXZN1sVs0lkc0bWTWXZN1sVsvlY1zrO7oBAADghFuEAAAAJqNgAQAAmIyCBQAAYDIKFgAAgMkoWAAAACajYAEAAJiMggUAAGAyChYAAIDJKFgAAAAmo2B5mHfffVeJiYnKysq64nYNDQ164YUXNHz4cA0aNEgPP/ywvvjiC8e83W7XzJkzlZiYqMGDBys7O1tnzpxp6eVfUXOy5ebmKjk5Wf3791daWpr%2B/ve/O%2BZ/8pOfqF%2B/foqLi3P8SklJaenlX5aruebNm%2Bf4WZcXfg0cONAx783HbNSoUU654uLi1KdPH/3pT3%2BSJCUnJys2NtZpftq0aa0R4ZJKS0uVkZGhhIQEJSYmat68eaqqqrrktlu3btXYsWPVv39/paam6r333nPMNXUeukNzsu3YsUMpKSnq37%2B/Ro0apT/%2B8Y%2BOuRUrVqhv376NjuvXX3/dWlGcuJrrzTffVJ8%2BfRqt%2B1//%2Bpck7z5mCxYsaJQrJiZGTz75pKSmX2Na28cff6wHH3xQN998sxITEzVz5kyVl5dfctv8/HyNGjVKAwYMUHp6uoqLix1ztbW1%2BuUvf6khQ4YoISFBmZmZqqysbK0YV8%2BAx8jLyzNGjhxpTJw40Zg5c%2BYVt83PzzeGDRtmHDx40Dh16pTx9NNPG2PHjjUaGhoMwzCMRx991PjZz35mVFRUGMePHzfS0tKMZ555pjViXFJzsv32t781hg4danz66adGbW2t8dJLLxm33HKLcerUKcMwDOP%2B%2B%2B833njjjdZYdpOak2vu3LnGSy%2B9dNl5bz5mFzt69Khx2223GeXl5YZhGMawYcOMDz74oCWWeVXuvvtuY968eUZ1dbVx7NgxIzU11Zg/f36j7fbv32/ExsYau3fvNs6cOWNs3LjRiI%2BPN44dO2YYRtPnoTu4mu2jjz4y4uLijP/93/81zp07Z%2Bzevdvo16%2Bf8eGHHxqGYRgvvfSSMXfu3NZe/mW5muuNN94w7r///svux5uP2cXOnTtnjBkzxti9e7dhGE2/xrSm2tpa47bbbjNyc3ON2tpao6Kiwrj//vuNGTNmNNr2nXfeMQYOHGjs27fPqKmpMdasWWPcfvvtxunTpw3DMIzFixcbqampxn/%2B8x%2BjsrLSePTRR42pU6e2dqRm4wqWBwkMDNT69et1ww03NLltQUGBJk%2BerBtvvFHBwcHKysrSoUOH9NFHH%2Bnrr7/W22%2B/raysLEVERKhz586aMWOG3njjDZ07d64VkjTWnGy%2Bvr564okn1KtXLwUEBOihhx6S3W7Xp59%2B2gorbZ7m5LoSbz9mF3v22Wf10EMP6brrrmuBlV2bqqoqxcbGavbs2Wrfvr26dOmie%2B%2B91%2Bkq6QWFhYVKSkpSUlKSAgMDlZKSot69e2vTpk2SrnweukNzstntdk2dOlUjRoyQv7%2B/kpKS1Lt370tu627NydUUbz5mF3v11Vf1ve99T0lJSa2w0uapqalRVlaWpk6dqoCAAEVEROiOO%2B7QZ5991mjbgoICpaamKj4%2BXkFBQZoyZYokadeuXaqrq9P69es1Y8YMde3aVWFhYZo5c6Z2796tr776qrVjNQsFy4M88MAD6tChQ5PbnTlzRgcPHlRMTIxjLDg4WDfccINsNpsOHDggPz8/RUdHO%2Bb79eunb775RocPH26RtTfF1WySNHnyZN11112Or48fPy5JioyMdIxt3bpVo0ePVv/%2B/TV58mQdPXrU3AW7qDm5JOmDDz7QPffco/79%2B2vcuHGOy%2BDefsy%2B7YMPPtCBAwf0wAMPOI3n5%2BdrxIgR6t%2B/vzIzM1VRUWHWUpslJCREixcvdip/x44dc/r/64KSkhKn80ySYmJiZLPZmjwP3aE52YYMGaKMjAzH13V1dSovL1fnzp0dY5988okmTpyoAQMGaMyYMU63R1tTc3JdmPvpT3%2BqQYMGafjw4dq4caOkpl873aG52S6oqqrS6tWr9fjjjzuNX%2B41prWFhoZq/Pjx8vf3lyQdPnxYf/rTn5xe2y%2B4%2BDzz9fVV3759ZbPZdPToUZ06dUr9%2BvVzzN94440KCgpSSUlJywe5BhQsL3Ty5EkZhqHQ0FCn8dDQUFVWVsputys4OFg%2BPj5Oc5K84771t5w9e1bZ2dlKSUnR9ddfL%2Bn8ydWrVy/9z//8j9555x1FRERoypQpOnv2rJtXe2Xdu3fXDTfcoDVr1ujdd9/VwIED9dBDD1numK1evVo//elPFRAQ4Bjr27evbrrpJm3cuFFbt26V3W7Xz3/%2Bczeu8v/ZbDa99tprmj59eqM5u91%2B2fOsqfPQE1wp28WWLVumdu3aafTo0ZKkLl26qHv37nr%2B%2Bef117/%2BVePHj9e0adPcVvi/7Uq5IiIiFBUVpccff1x//etfNWvWLM2fP19FRUWWOmavvfaaBg0apF69ejnGrvQa4y6lpaWKjY3V6NGjFRcXp8zMzEbbXOk8s9vtks4X0W8LCQnxmGN2ORQsL2YYxlXNeYvq6mo98sgj8vPz06JFixzjCxcu1Ny5cxUWFqaIiAg9/fTTKi0t1d69e9242qZlZGToueeeU%2BfOnRUcHKzHH39cAQEBevvttyVZ45h9%2Bumn2rdvnyZMmOA0vnLlSk2dOlXt27dX165d9dRTT%2BnDDz9025XHC/bu3auHH35Ys2fPVmJi4iW3aeq4eOpxcyWbdH79S5cu1ZYtW7Rq1SoFBgZKksaPH6%2BXXnpJN9xwg9q2bavJkyerb9%2B%2Bjtuj7tJUrqFDh%2Brll19WTEyMAgICNGbMGN1xxx168803Hdt4%2BzGrr6/XunXrGl0lbuo1xh26desmm82m7du36/PPP9cTTzxxye289Ty7EgqWFwoLC5Ovr6%2Bj2V9gt9vVsWNHRUREqLq6WvX19U5zktSxY8dWXevVOnHihO6//3516NBBv/3tb9WuXbvLbhscHKzQ0FCPvx9/MT8/P3Xt2lVlZWWWOGaStH37dt16661XPF7S%2BRddSSorK2uNZV3Szp079bOf/Uzz589v9BfVBeHh4Zc8zyIiIpo8D93JlWzS%2Be%2Bomzdvnnbu3KnXX39dP/jBD664327dunn8MbuUC%2Bu2wjGTpA8//FBnz55t8jsEv/0a404%2BPj6KiopSVlaWtmzZohMnTjjNX%2Bk8i4iIcHz9bSdPnnT7MWsKBcsLBQYGqlevXk73n6uqqnT06FHddNNN6tu3rwzD0Mcff%2ByYt9lsCgkJUY8ePdyx5Gapra3V1KlT1a9fP7300ksKCgpyzFVXV2vhwoVOZerEiRM6ceKEunfv7o7lusQwDC1evNjpmJw9e1ZHjx5V9%2B7dvf6YXfDOO%2B/o9ttvdxorLS3VU0895XQL99ChQ5LktmP2j3/8Q3PnztWLL76oe%2B6557LbxcbGNnoPi81mU3x8fJPnobu4mk2SnnvuOX322Wd6/fXXGx2L//7v/1ZRUZHT2KFDhzz%2BmL3%2B%2BuvaunWr09iFdVvhmEnnz7Nbb73V8f4mqenXmNZWVFSkUaNGqaGhwTHm63u%2BcrRp08Zp29jYWKdjUl9fr/379ys%2BPl7du3dXaGio0/ynn36qs2fPKjY2toVTXBsKlpf46quvdOeddzo%2BryU9PV35%2Bfk6dOiQqqurtWzZMsdn1kRERGjUqFH69a9/rRMnTuj48eNauXKlxo0b53RCeoqLs61du1Zt2rTRM8884zghLwgODtZHH32knJwc2e12nTx5UosWLVJ0dLT69%2B/vjuVf1rdz%2Bfj46Msvv9SiRYv01Vdf6fTp01q2bJnatGmjESNGeP0xk86/mB88eNDxXrkLOnbsqJ07d2rJkiX65ptv9NVXX2nx4sUaNmyY0xuqW0tdXZ0WLFigOXPmaPDgwY3mH3zwQcdf0BMmTND777%2Bv3bt3q7a2VuvXr9fnn3/u%2BNy1K52H7tCcbHv37tWmTZuUl5ensLCwRtva7XYtWrRIhw8fVm1trdauXaujR4/q3nvvbfEcF2tOrrNnz%2BqZZ56RzWbTuXPntGXLFv3lL3/RxIkTJXn3MbvgwIEDjc6zpl5jWltsbKyqq6u1dOlS1dTU6MSJE1qxYoUGDhyoDh066M4773R8p2R6ero2bNigffv2qaamRqtWrVJAQICGDh0qPz8/TZgwQatXr9axY8dUWVmp//qv/9Idd9zhkd%2Bl/G2e98r9HXbhBK%2Brq5Mkx33zCy8UR44ccVwFmDhxosrLy/WTn/xEp0%2BfVkJCgnJzcx37evrpp/XUU09p%2BPDhatOmje6%2B%2B%2B4mPyyyJTUn2xtvvKFjx44pPj7eaR/Tp0/XjBkztHLlSj333HMaNWqUzp49q9tuu015eXmNylhraE6uZ599Vs8//7xSU1NVXV2tm266Sa%2B%2B%2Bqrjdpo3HzPp/F/IdXV1jV70goKC9PLLL2vJkiUaMmSIJOmOO%2B5wfDhia9u3b58OHTqknJwc5eTkOM1t375dX3zxhU6ePClJ6t27t5YtW6bFixertLRUPXv21Jo1a9SpUydJTZ%2BHra052d544w2dOnVKw4YNc9pu0KBBWrt2rWbPni3p/Hf12u129ezZU7/73e/UpUuX1gnzLc3J9cADD%2Bj06dP6%2Bc9/rvLycl1//fVauXKl42qHNx%2BzC8rLyy9ZLpp6jWlNHTp00Nq1a5WTk%2BN428Ctt96qZ599VpJ05MgRffPNN5LOf0frrFmzNHPmTFVUVCguLk55eXmOuxeZmZk6ffq0fvzjH6uurk7Dhg3TwoULWz1Tc/kY3vjOMQAAAA/GLUIAAACTUbAAAABMRsECAAAwGQULAADAZBQsAAAAk1GwAAAATEbBAgAAMBkFCwAAwGQULAAAAJNRsAAAAExGwQIAADAZBQsAAMBkFCwAAACT/R8JC4Y8CWYLUgAAAABJRU5ErkJggg%3D%3D"/>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12" id="common-8665591789917202290">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">3</td>
        <td class="number">709</td>
        <td class="number">54.2%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1</td>
        <td class="number">323</td>
        <td class="number">24.7%</td>
        <td>
            <div class="bar" style="width:46%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">277</td>
        <td class="number">21.2%</td>
        <td>
            <div class="bar" style="width:39%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12"  id="extreme-8665591789917202290">
            <p class="h4">Minimum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">1</td>
        <td class="number">323</td>
        <td class="number">24.7%</td>
        <td>
            <div class="bar" style="width:46%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">277</td>
        <td class="number">21.2%</td>
        <td>
            <div class="bar" style="width:39%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">709</td>
        <td class="number">54.2%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
            <p class="h4">Maximum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">1</td>
        <td class="number">323</td>
        <td class="number">24.7%</td>
        <td>
            <div class="bar" style="width:46%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">277</td>
        <td class="number">21.2%</td>
        <td>
            <div class="bar" style="width:39%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">709</td>
        <td class="number">54.2%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
    </div>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_sex">sex<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="">
            <th>Distinct count</th>
            <td>2</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>0.2%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (%)</th>
            <td>0.0%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (n)</th>
            <td>0</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable3282040025542259819">
    <table class="mini freq">
        <tr class="">
    <th>male</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 64.4%">
            843
        </div>

    </td>
</tr><tr class="">
    <th>female</th>
    <td>
        <div class="bar" style="width:55%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 35.6%">
            466
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable3282040025542259819, #minifreqtable3282040025542259819"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable3282040025542259819">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">male</td>
        <td class="number">843</td>
        <td class="number">64.4%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">female</td>
        <td class="number">466</td>
        <td class="number">35.6%</td>
        <td>
            <div class="bar" style="width:55%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_sibsp">sibsp<br/>
            <small>Numeric</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Distinct count</th>
                    <td>7</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>0.5%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (n)</th>
                    <td>0</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Infinite (n)</th>
                    <td>0</td>
                </tr>
            </table>

        </div>
        <div class="col-sm-6">
            <table class="stats ">

                <tr>
                    <th>Mean</th>
                    <td>0.49885</td>
                </tr>
                <tr>
                    <th>Minimum</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Maximum</th>
                    <td>8</td>
                </tr>
                <tr class="alert">
                    <th>Zeros (%)</th>
                    <td>68.1%</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minihistogram-6934951144010511826">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABLCAYAAAA1fMjoAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAARxJREFUeJzt3MEJAjEUQEEVS7IIe/JsTxZhT/Eu8nADuovO3AP/8hICIfsxxtgBLx3WHgC27Lj2AM9Ol9viNffr%2BQOTgBMEkkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBMLmfnef4Ud4PsUJAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEH7iufsMT%2BR5x98GMmNpVDNBzYS71LdC/4VNaD/GGGsPAVvlDgJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBALhAdogGpWY44YEAAAAAElFTkSuQmCC">

</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#descriptives-6934951144010511826,#minihistogram-6934951144010511826"
       aria-expanded="false" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="row collapse col-md-12" id="descriptives-6934951144010511826">
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#quantiles-6934951144010511826"
                                                  aria-controls="quantiles-6934951144010511826" role="tab"
                                                  data-toggle="tab">Statistics</a></li>
        <li role="presentation"><a href="#histogram-6934951144010511826" aria-controls="histogram-6934951144010511826"
                                   role="tab" data-toggle="tab">Histogram</a></li>
        <li role="presentation"><a href="#common-6934951144010511826" aria-controls="common-6934951144010511826"
                                   role="tab" data-toggle="tab">Common Values</a></li>
        <li role="presentation"><a href="#extreme-6934951144010511826" aria-controls="extreme-6934951144010511826"
                                   role="tab" data-toggle="tab">Extreme Values</a></li>

    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active row" id="quantiles-6934951144010511826">
            <div class="col-md-4 col-md-offset-1">
                <p class="h4">Quantile statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Minimum</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>5-th percentile</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Q1</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Median</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Q3</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>95-th percentile</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th>Maximum</th>
                        <td>8</td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td>8</td>
                    </tr>
                    <tr>
                        <th>Interquartile range</th>
                        <td>1</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4 col-md-offset-2">
                <p class="h4">Descriptive statistics</p>
                <table class="stats indent">
                    <tr>
                        <th>Standard deviation</th>
                        <td>1.0417</td>
                    </tr>
                    <tr>
                        <th>Coef of variation</th>
                        <td>2.0881</td>
                    </tr>
                    <tr>
                        <th>Kurtosis</th>
                        <td>20.043</td>
                    </tr>
                    <tr>
                        <th>Mean</th>
                        <td>0.49885</td>
                    </tr>
                    <tr>
                        <th>MAD</th>
                        <td>0.67911</td>
                    </tr>
                    <tr class="">
                        <th>Skewness</th>
                        <td>3.8442</td>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>653</td>
                    </tr>
                    <tr>
                        <th>Variance</th>
                        <td>1.0851</td>
                    </tr>
                    <tr>
                        <th>Memory size</th>
                        <td>10.3 KiB</td>
                    </tr>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane col-md-8 col-md-offset-2" id="histogram-6934951144010511826">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzt3X1UlHX%2B//EXMALJnZCBu1RrrWYiHg1v2EXzhkpN07zBEHePsZspRbIq7Ffz5pRnXbHU07roUWnTtDo16WlDMW%2B2KKuv7I1Z7YDmumbtwmqwwEQaptz8/ugn352sZZCPXTNXz8c5nZPXDNe83%2BLN02uGIaClpaVFAAAAMCbQ6gEAAADshsACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwjMACAAAwzGH1AN8V1dWfGT9nYGCAYmLCVFt7Vs3NLcbPbxW77iXZdze77iWxmz%2By616SfXe7kntdc02E0fN5iytYfiwwMEABAQEKDAywehSj7LqXZN/d7LqXxG7%2ByK57SfbdzY57EVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGEVgAAACGOaweAB0zcPFeq0fw2p65Q6weAQCAbwVXsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAwjsAAAAAyzbWAdOXJEM2bM0MCBAzVkyBDl5eWptrZWklRaWqq0tDQlJSVp3Lhx2rlzp8fHbtu2TaNHj1ZSUpIyMjJUVlZmxQoAAMBP2TKwGhsbNWvWLPXv318HDx5UcXGxamtr9eijj6qqqkoPPvigpk2bptLSUi1evFhLly6Vy%2BWSJJWUlKigoECPP/64Dh48qJEjRyorK0uff/65xVsBAAB/YcvAqq6uVnV1te6%2B%2B24FBwcrOjpad9xxh44ePapdu3ape/fuSktLU0hIiFJSUpSamqrt27dLkpxOpyZPnqx%2B/fopNDRUM2fOlCS9/vrrVq4EAAD8iMPqAa6EuLg49e7dW06nU7/4xS907tw57d%2B/XyNGjFB5ebkSEhI87p%2BQkKA9e/ZIksrLyzV27NjW2wIDA9W7d2%2B5XC6NGzfOq8evqqpSdXW1xzGHo7NiY2M7uJmnoCD/6mOHw7t5L%2B7lb/t5w6672XUvid38kV33kuy7mx33smVgBQYGqqCgQJmZmdq6daskafDgwcrNzdWDDz6ouLg4j/t36dJFdXV1kiS3262oqCiP26Oiolpv94bT6dS6des8jmVnZysnJ%2Bdy1rGN6Oiwdt0/MvKqKzSJ9ey6m133ktjNH9l1L8m%2Bu9lpL1sG1vnz55WVlaUxY8a0vn5q2bJlysvL8%2BrjW1paOvT46enpSk1N9TjmcHRWXd3ZDp33q/yt9L3dPygoUJGRV6m%2BvkFNTc1XeKpvl113s%2BteErv5I7vuJdl3tyu5V3v/cW%2BKLQOrtLRUFRUVmj9/voKCghQREaGcnBzdfffduvXWW%2BV2uz3uX1dXp5iYGElSdHT0Jbe73W717NnT68ePjY295OnA6urP1Nhon98Ml6O9%2Bzc1Ndv258yuu9l1L4nd/JFd95Lsu5ud9vKvSyBeampqUnNzs8eVqPPnz0uSUlJSLnnbhbKyMvXr10%2BSlJiYqPLyco9zHTlypPV2AACAttgysG655RZ17txZBQUFamhoUF1dnTZs2KBBgwbp7rvvVmVlpbZv364vvvhCBw4c0IEDB3TPPfdIkjIyMvTyyy/rvffeU0NDgzZs2KDg4GCNGDHC2qUAAIDfsGVgRUdH66mnntLhw4c1bNgw3XXXXQoNDdWaNWt09dVXa9OmTXr22Wc1YMAArVixQqtWrdLNN98sSRo2bJjmz5%2BvuXPnavDgwTp48KAKCwsVGhpq8VYAAMBf2PI1WNKXT/U988wzX3vboEGDVFRU9I0fO336dE2fPv1KjQYAAGzOllewAAAArERgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGEZgAQAAGGbrwNqwYYOGDh2q/v37KzMzUxUVFZKk0tJSpaWlKSkpSePGjdPOnTs9Pm7btm0aPXq0kpKSlJGRobKyMivGBwAAfsq2gfXcc89p586d2rZtm95%2B%2B2316NFDTz/9tKqqqvTggw9q2rRpKi0t1eLFi7V06VK5XC5JUklJiQoKCvT444/r4MGDGjlypLKysvT5559bvBEAAPAXtg2szZs3a968ebrxxhsVHh6uJUuWaMmSJdq1a5e6d%2B%2ButLQ0hYSEKCUlRampqdq%2Bfbskyel0avLkyerXr59CQ0M1c%2BZMSdLrr79u5ToAAMCP2DKwPvnkE1VUVOjTTz/V2LFjlZycrJycHNXW1qq8vFwJCQke909ISGh9GvCrtwcGBqp3796tV7gAAADa4rB6gCvh9OnTkqS9e/dqy5YtamlpUU5OjpYsWaJz584pLi7O4/5dunRRXV2dJMntdisqKsrj9qioqNbbvVFVVaXq6mqPYw5HZ8XGxl7OOt8oKMi/%2Btjh8G7ei3v5237esOtudt1LYjd/ZNe9JPvuZse9bBlYLS0tkqSZM2e2xtScOXN0//33KyUlxeuPv1xOp1Pr1q3zOJadna2cnJwOndffRUeHtev%2BkZFXXaFJrGfX3ey6l8Ru/siue0n23c1Oe9kysLp27SpJioyMbD0WHx%2BvlpYWXbhwQW632%2BP%2BdXV1iomJkSRFR0dfcrvb7VbPnj29fvz09HSlpqZ6HHM4Oquu7my79miLv5W%2Bt/sHBQUqMvIq1dc3qKmp%2BQpP9e2y62523UtiN39k170k%2B%2B52Jfdq7z/uTbFlYHXr1k3h4eE6evSo%2BvTpI0mqrKxUp06dNHz4cBUVFXncv6ysTP369ZMkJSYmqry8XJMmTZIkNTU16ciRI0pLS/P68WNjYy95OrC6%2BjM1NtrnN8PlaO/%2BTU3Ntv05s%2Btudt1LYjd/ZNe9JPvuZqe9/OsSiJccDofS0tK0ceNGffzxx6qpqdH69es1fvx4TZo0SZWVldq%2Bfbu%2B%2BOILHThwQAcOHNA999wjScrIyNDLL7%2Bs9957Tw0NDdqwYYOCg4M1YsQIa5cCAAB%2Bw5ZXsCQpNzdX58%2Bf19SpU3XhwgWNHj1aS5YsUVhYmDZt2qTly5dr2bJlio%2BP16pVq3TzzTdLkoYNG6b58%2Bdr7ty5qqmpUd%2B%2BfVVYWKjQ0FCLNwIAAP4ioKWjr%2BiGV6qrPzN%2BTocjUHesfsv4ea%2BUPXOHeHU/hyNQ0dFhqqs7a5tLxRfZdTe77iWxmz%2By616SfXe7kntdc02E0fN5y5ZPEQIAAFiJwAIAADCMwAIAADCMwAIAADCMwAIAADCMwAIAADDM5wIrNTVV69at06lTp6weBQAA4LL4XGBNmTJFr7zyim6//XbNnDlT%2B/fvV2Njo9VjAQAAeM3nAis7O1uvvPKKXnzxRfXs2VMrVqzQ8OHDtWrVKp08edLq8QAAANrkc4F1UZ8%2BfbRgwQK9/vrrWrRokV588UWNHTtW9913n/76179aPR4AAMA38tnAunDhgl555RXdf//9WrBggeLi4vTwww%2Brd%2B/eyszM1K5du6weEQAA4Gv53Dd7PnHihHbs2KGXX35ZZ8%2Be1ejRo7V161YNGDCg9T6DBg3So48%2BqvHjx1s4KQAAwNfzucAaN26cbrjhBs2ePVsTJ05Uly5dLrnP8OHDVVtba8F0AAAAbfO5wNq2bZsGDx7c5v3ef//9b2EaAACA9vO512D16tVLWVlZevXVV1uPPf3007r//vvldrstnAwAAMA7PhdY%2Bfn5%2Buyzz9SjR4/WYyNGjFBzc7NWrlxp4WQAAADe8bmnCN9%2B%2B23t2rVL0dHRrce6d%2B%2Bu1atX66677rJwMgAAAO/43BWsc%2BfOKSQk5JLjgYGBamhosGAiAACA9vG5wBo0aJBWrlypTz/9tPXYJ598omXLlnm8VQMAAICv8rmnCBctWqSf//zn%2BvGPf6zw8HA1Nzfr7Nmzuu666/TMM89YPR4AAECbfC6wrrvuOu3evVtvvvmm/vGPfygwMFA33HCDhg4dqqCgIKvHAwAAaJPPBZYkBQcH6/bbb7d6DAAAgMvic4H1z3/%2BU2vWrNHx48d17ty5S25/7bXXLJgKAADAez4XWIsWLVJVVZWGDh2qzp07Wz0OAABAu/lcYJWVlem1115TTEyM1aMAAABcFp97m4arr76aK1cAAMCv%2BVxgzZ49W%2BvWrVNLS4vVowAAAFwWn3uK8M0339Thw4f10ksv6dprr1VgoGcDvvDCCxZNBgAA4B2fC6zw8HANGzbM6jEAAAAum88FVn5%2BvtUjAAAAdIjPvQZLkj788EMVFBTo4Ycfbj327rvvWjgRAACA93wusEpLSzVhwgTt379fxcXFkr5889EZM2bwJqMAAMAv%2BFxgPfHEE/rlL3%2BpXbt2KSAgQNKX359w5cqVWr9%2BvcXTAQAAtM3nAutvf/ubMjIyJKk1sCRpzJgxOnHihFVjAQAAeM3nAisiIuJrvwdhVVWVgoODLZgIAACgfXwusJKSkrRixQqdOXOm9djJkye1YMEC/fjHP7ZwMgAAAO/43Ns0PPzww7r33nuVnJyspqYmJSUlqaGhQT179tTKlSutHg8AAKBNPhdY3bp1U3FxsQ4cOKCTJ08qNDRUN9xwg4YMGeLxmiwAAABf5XOBJUmdOnXS7bffbvUYAAAAl8XnAis1NfW/XqnivbAAAICv87nAGjt2rEdgNTU16eTJk3K5XLr33nstnAwAAMA7PhdYeXl5X3t83759%2BtOf/vQtTwMAANB%2BPvc2Dd/k9ttv1%2B7du60eAwAAoE1%2BE1hHjhxRS0uL1WMAAAC0yeeeIpw2bdolxxoaGnTixAmNGjXKgokAAADax%2BcCq3v37pd8FWFISIjS0tI0depUi6YCAADwns8FFu/WDgAA/J3PBdbLL7/s9X0nTpx4BScBAAC4PD4XWIsXL1Zzc/MlL2gPCAjwOBYQEEBgAQAAn%2BRzgfW73/1OmzdvVlZWlnr16qWWlhYdO3ZMTz75pH76058qOTnZ6hEBAAD%2BK58LrJUrV6qwsFBxcXGtxwYOHKjrrrtO9913n4qLiy2cDgAAoG0%2B9z5YH330kaKioi45HhkZqcrKSgsmAgAAaB%2BfC6z4%2BHitXLlSdXV1rcfq6%2Bu1Zs0aXX/99RZOBgAA4B2fe4pw0aJFys3NldPpVFhYmAIDA3XmzBmFhoZq/fr1Vo8HAADQJp8LrKFDh%2BqNN97QgQMHdPr0abW0tCguLk633nqrIiIirB4PAACgTT4XWJJ01VVX6bbbbtPp06d13XXXWT0OAABAu/jca7DOnTunBQsW6JZbbtGdd94p6cvXYM2cOVP19fUWTwcAANA2nwusVatW6ejRo1q9erUCA/9vvKamJq1evdrCyQAAALzjc4G1b98%2B/fa3v9WYMWNav%2BlzZGSk8vPztX///ss654oVK9SrV6/WH5eWliotLU1JSUkaN26cdu7c6XH/bdu2afTo0UpKSlJGRobKysoufyEAAPCd43OBdfbsWXXv3v2S4zExMfr888/bfb6jR4%2BqqKio9cdVVVV68MEHNW3aNJWWlmrx4sVaunSpXC6XJKmkpEQFBQV6/PHHdfDgQY0cOVJZWVmX9dgAAOC7yecC6/rrr9ef/vQnSfL43oN79%2B7V97///Xadq7m5WY888ogyMzNbj%2B3atUvdu3dXWlqaQkJClJKSotTUVG3fvl2S5HQ6NXnyZPXr10%2BhoaGaOXOmJOn111/v4GYAAOC7wue%2BinD69OmaM2eOpkyZoubmZm3ZskVlZWXat2%2BfFi9e3K5zvfDCCwoJCdH48eP1m9/8RpJUXl6uhIQEj/slJCRoz549rbePHTu29bbAwED17t1bLpdL48aN8%2Bpxq6qqVF1d7XHM4eis2NjYds3flqAgn%2Bvj/8rh8G7ei3v5237esOtudt1LYjd/ZNe9JPvuZse9fC6w0tPT5XA49OyzzyooKEgbN27UDTfcoNWrV2vMmDFen%2Bff//63CgoK9Mwzz3gcd7vdHt/nUJK6dOnS%2Bs7xbrf7km/VExUV5fHO8m1xOp1at26dx7Hs7Gzl5OR4fQ47io4Oa9f9IyOvukKTWM%2Buu9l1L4nd/JFd95Lsu5ud9vK5wKqtrdWUKVM0ZcqUDp0nPz9fkydPVo8ePVRRUdGuj/3PpyYvR3p6ulJTUz2OORydVVd3tkPn/Sp/K31v9w8KClRk5FWqr29QU1PzFZ7q22XX3ey6l8Ru/siue0n23e1K7tXef9yb4nOBddttt%2Bnw4cOtX0F4OUpLS/Xuu%2B%2BquLj4ktuio6Pldrs9jtXV1SkmJuYbb3e73erZs6fXjx8bG3vJ04HV1Z%2BpsdE%2BvxkuR3v3b2pqtu3PmV13s%2BteErv5I7vuJdl3Nzvt5XOXQJKTk1tfD3W5du7cqZqaGo0cOVLJycmaPHly67lvuummS952oaysTP369ZMkJSYmqry8vPW2pqYmHTlypPV2AACAtvjcFazvfe97%2BvWvf63CwkJdf/316tSpk8fta9asafMcCxcu1C9%2B8YvWH58%2BfVrp6ekqKipSc3OzNm3apO3bt2vChAn64x//qAMHDsjpdEqSMjIyNH/%2BfN11113q1auXnnrqKQUHB2vEiBFG9wQAAPblc4H197//XTfeeKMkteuF5f8pKirK44XqjY2NkqRu3bpJkjZt2qTly5dr2bJlio%2BP16pVq3TzzTdLkoYNG6b58%2Bdr7ty5qqmpUd%2B%2BfVVYWKjQ0NCOrAUAAL5DfCaw5s2bpyeeeMLjq/7Wr1%2Bv7OzsDp/72muv1bFjx1p/PGjQII83H/2q6dOna/r06R1%2BXAAA8N3kM6/BKikpueRYYWGhBZMAAAB0jM8E1te9NUJH3y4BAADACj4TWF/3tgwdeasGAAAAq/hMYAEAANgFgQUAAGCYz3wV4YULF5Sbm9vmMW/eBwsAAMBKPhNYAwYMUFVVVZvHAAAAfJ3PBNZ/vv8VAACAP%2BM1WAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIYRWAAAAIY5rB4A3x13/uZ/rR6hXfbMHWL1CAAAP8UVLAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMMILAAAAMNsG1iVlZXKzs5WcnKyUlJStHDhQtXX10uSjh49qp/%2B9KcaMGCARo0apc2bN3t87CuvvKLx48frlltu0eTJk/X2229bsQIAAPBTtg2srKwsRUZGqqSkRC%2B99JKOHz%2Buxx57TOfOndPs2bP1ox/9SG%2B99ZaeeOIJbdq0Sfv375f0ZXwtWLBAeXl5%2BuMf/6jMzEw99NBDOn36tMUbAQAAf2HLwKqvr1diYqJyc3MVFhambt26adKkSTp06JDeeOMNXbhwQQ888IA6d%2B6sPn36aOrUqXI6nZKk7du3a/jw4Ro%2BfLhCQkI0YcIE3XTTTdq5c6fFWwEAAH9hy8CKjIxUfn6%2Bunbt2nrs1KlTio2NVXl5uXr16qWgoKDW2xISElRWViZJKi8vV0JCgsf5EhIS5HK5vp3hAQCA33NYPcC3weVy6dlnn9WGDRu0Z88eRUZGetzepUsXud1uNTc3y%2B12KyoqyuP2qKgo/f3vf/f68aqqqlRdXe1xzOHorNjY2Mtf4msEBdmyj32Gw2H%2B5/fi58xunzu77iWxmz%2By616SfXez4162D6x33nlHDzzwgHJzc5WSkqI9e/Z87f0CAgJa/7%2BlpaVDj%2Bl0OrVu3TqPY9nZ2crJyenQefHtio4Ou2Lnjoy86oqd20p23UtiN39k170k%2B%2B5mp71sHVglJSX65S9/qaVLl2rixImSpJiYGH300Uce93O73erSpYsCAwMVHR0tt9t9ye0xMTFeP256erpSU1M9jjkcnVVXd/byFvkGdip9X2T68yV9%2BTmLjLxK9fUNampqNn5%2Bq9h1L4nd/JFd95Lsu9uV3OtK/mP5v7FtYB0%2BfFgLFizQ2rVrNXTo0NbjiYmJev7559XY2CiH48v1XS6X%2BvXr13r7xddjXeRyuTRu3DivHzs2NvaSpwOrqz9TY6N9fjN8F1zJz1dTU7Mtfz3YdS%2BJ3fyRXfeS7Lubnfay5SWQxsZGLVmyRHl5eR5xJUnDhw9XeHi4NmzYoIaGBr3//vvasWOHMjIyJEn33HOPDh48qDfeeENffPGFduzYoY8%2B%2BkgTJkywYhUAAOCHbHkF67333tOJEye0fPlyLV%2B%2B3OO2vXv3auPGjXrkkUdUWFiorl27at68eRoxYoQk6aabbtLq1auVn5%2BvyspK9ejRQ5s2bdI111xjwSYAAMAf2TKwBg4cqGPHjv3X%2Bzz//PPfeNuoUaM0atQo02MBAIDvCFs%2BRQgAAGAlAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwh9UDAL7qzt/8r9UjtMueuUOsHgEA8P9xBQsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwAgsAAMAwvooQANowcPFeq0doF76iFLAegQXYhD%2B9rQQBAMDueIoQAADAMAILAADAMALra1RWVmrWrFlKTk7WyJEjtWrVKjU3N1s9FgAA8BO8ButrzJkzR3369NGrr76qmpoazZ49W127dtXPfvYzq0cDAMBr/vTazEO/HmP1CEYRWF/hcrn0wQcfaMuWLYqIiFBERIQyMzO1detWAguAX/Cnv1T5ggfYFYH1FeXl5YqPj1dUVFTrsT59%2BujkyZM6c%2BaMwsPD2zxHVVWVqqurPY45HJ0VGxtrdNagIJ7hhX9yOPzn1y6/z66sK/Fr4eLnzI6fOzvvJtlrLwLrK9xutyIjIz2OXYyturo6rwLL6XRq3bp1HsceeughzZkzx9yg%2BjLk7u12XOnp6cbjzUpVVVVyOp2220uy72523Uuy7%2B8zyb6ft6qqKm3d%2Bjvb7SW1fzd/edqtqqpKBQUFtvqc2ScVDWppaenQx6enp%2Bull17y%2BC89Pd3QdP%2Bnurpa69atu%2BRqmb%2Bz616SfXez614Su/kju%2B4l2Xc3O%2B7FFayviImJkdvt9jjmdrsVEBCgmJgYr84RGxtrmwIHAADtxxWsr0hMTNSpU6dUW1vbeszlcqlHjx4KCwuzcDIAAOAvCKyvSEhIUN%2B%2BfbVmzRqdOXNGJ06c0JYtW5SRkWH1aAAAwE8EPfroo49aPYSvufXWW1VcXKxf/epX2r17t9LS0nTfffcpICDA6tEuERYWpsGDB9vu6ppd95Lsu5td95LYzR/ZdS/JvrvZba%2BAlo6%2BohsAAAAeeIoQAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMAILAADAMALLD1VWVmrWrFlKTk7WyJEjtWrVKjU3N1s9ljFvvfWWUlJSNG/ePKtHMaqyslLZ2dlKTk5WSkqKFi5cqPr6eqvH6rAPPvhA9957rwYMGKCUlBTNnTtX1dXVVo9l1IoVK9SrVy%2BrxzCmV69eSkxMVN%2B%2BfVv/%2B9WvfmX1WMZs2LBBQ4cOVf/%2B/ZWZmamKigqrR%2Bqwv/zlLx6fr759%2ByoxMdEWvy6PHDmiGTNmaODAgRoyZIjy8vJUW1tr9VgdRmD5oTlz5iguLk6vvvqqtmzZoldffVVbt261eiwjnnzySS1fvlw/%2BMEPrB7FuKyhmNzSAAAGnklEQVSsLEVGRqqkpEQvvfSSjh8/rscee8zqsTrk/Pnz%2BvnPf67BgwertLRUxcXFqqmpkZ2%2BxenRo0dVVFRk9RjG7d27Vy6Xq/W/pUuXWj2SEc8995x27typbdu26e2331aPHj309NNPWz1Whw0aNMjj8%2BVyufTQQw/pzjvvtHq0DmlsbNSsWbPUv39/HTx4UMXFxaqtrbXFnyEElp9xuVz64IMPlJeXp4iICHXv3l2ZmZlyOp1Wj2ZESEiIduzYYbvAqq%2BvV2JionJzcxUWFqZu3bpp0qRJOnTokNWjdUhDQ4PmzZun2bNnKzg4WDExMbrjjjt0/Phxq0czorm5WY888ogyMzOtHgVe2rx5s%2BbNm6cbb7xR4eHhWrJkiZYsWWL1WMb961//0pYtW/Q///M/Vo/SIdXV1aqurtbdd9%2Bt4OBgRUdH64477tDRo0etHq3DCCw/U15ervj4eEVFRbUe69Onj06ePKkzZ85YOJkZM2bMUEREhNVjGBcZGan8/Hx17dq19dipU6cUGxtr4VQdFxUVpalTp8rhcEiSPvzwQ/3%2B97/3%2B39VX/TCCy8oJCRE48ePt3oU49asWaMRI0Zo4MCBWrp0qc6ePWv1SB32ySefqKKiQp9%2B%2BqnGjh2r5ORk5eTk2OLppq9au3atpkyZou9///tWj9IhcXFx6t27t5xOp86ePauamhrt379fI0aMsHq0DiOw/Izb7VZkZKTHsYuxVVdXZ8VIuAwul0vPPvusHnjgAatHMaKyslKJiYkaO3as%2Bvbtq5ycHKtH6rB///vfKigo0COPPGL1KMb1799fKSkp2r9/v5xOp9577z0tW7bM6rE67PTp05K%2BfPpzy5YtKioq0unTp213BauiokL79%2B/Xz372M6tH6bDAwEAVFBTotddeU1JSklJSUtTY2Kjc3FyrR%2BswAssPtbS0WD0COuCdd97Rfffdp9zcXKWkpFg9jhHx8fFyuVzau3evPvroI79/2kKS8vPzNXnyZPXo0cPqUYxzOp2aOnWqgoOD9cMf/lB5eXkqLi7W%2BfPnrR6tQy7%2B2Thz5kzFxcWpW7dumjNnjkpKSvTFF19YPJ05zz33nEaNGqVrrrnG6lE67Pz588rKytKYMWN06NAhvfnmm4qIiFBeXp7Vo3UYgeVnYmJi5Ha7PY653W4FBAQoJibGoqngrZKSEs2aNUuLFi3SjBkzrB7HqICAAHXv3l3z5s1rfaGqvyotLdW7776r7Oxsq0f5Vlx77bVqampSTU2N1aN0yMWn4P/zKn98fLxaWlr8frf/tG/fPqWmplo9hhGlpaWqqKjQ/PnzFRERobi4OOXk5OgPf/jDJX/X%2BRsCy88kJibq1KlTHn95uVwu9ejRQ2FhYRZOhrYcPnxYCxYs0Nq1azVx4kSrxzGitLRUo0eP9nibkMDAL/9Y6dSpk1VjddjOnTtVU1OjkSNHKjk5WZMnT5YkJScna/fu3RZP1zFHjhzRypUrPY6dOHFCwcHBfv%2BawG7duik8PNzjBdKVlZXq1KmT3%2B920dGjR1VZWakhQ4ZYPYoRTU1Nam5u9nhmxt%2BvpF5EYPmZhIQE9e3bV2vWrNGZM2d04sQJbdmyRRkZGVaPhv%2BisbFRS5YsUV5enoYOHWr1OMYkJibqzJkzWrVqlRoaGlRbW6uCggINHDjQr79YYeHChdq3b5%2BKiopUVFSkwsJCSVJRUZHfXzm4%2Buqr5XQ6VVhYqPPnz%2BvkyZNau3at0tPTFRQUZPV4HeJwOJSWlqaNGzfq448/Vk1NjdavX6/x48e3fiGGvzty5Ii6dOmi8PBwq0cx4pZbblHnzp1VUFCghoYG1dXVacOGDRo0aJC6dOli9XgdEtDCC3r8zunTp7V06VL9%2Bc9/Vnh4uKZNm6aHHnpIAQEBVo/WYX379pX0ZZBIav1D0eVyWTaTCYcOHdJPfvITBQcHX3Lb3r17FR8fb8FUZhw7dkzLly/XX//6V3Xu3Fk/%2BtGPtHDhQsXFxVk9mjEVFRW67bbbdOzYMatHMeIvf/mL1qxZo2PHjik4OFiTJk3SvHnzFBISYvVoHXb%2B/Hnl5%2Bdr9%2B7dunDhgkaPHq2lS5fa5gr/pk2btGvXLhUXF1s9ijFlZWV67LHH9MEHHyg4OFiDBw%2B2xZ8hBBYAAIBhPEUIAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABgGIEFAABg2P8DjiCk3ZLeIcwAAAAASUVORK5CYII%3D"/>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12" id="common-6934951144010511826">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0</td>
        <td class="number">891</td>
        <td class="number">68.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1</td>
        <td class="number">319</td>
        <td class="number">24.4%</td>
        <td>
            <div class="bar" style="width:36%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">42</td>
        <td class="number">3.2%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">22</td>
        <td class="number">1.7%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">20</td>
        <td class="number">1.5%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">8</td>
        <td class="number">9</td>
        <td class="number">0.7%</td>
        <td>
            <div class="bar" style="width:2%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">5</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
        <div role="tabpanel" class="tab-pane col-md-12"  id="extreme-6934951144010511826">
            <p class="h4">Minimum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0</td>
        <td class="number">891</td>
        <td class="number">68.1%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1</td>
        <td class="number">319</td>
        <td class="number">24.4%</td>
        <td>
            <div class="bar" style="width:36%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">2</td>
        <td class="number">42</td>
        <td class="number">3.2%</td>
        <td>
            <div class="bar" style="width:5%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">20</td>
        <td class="number">1.5%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">22</td>
        <td class="number">1.7%</td>
        <td>
            <div class="bar" style="width:3%">&nbsp;</div>
        </td>
</tr>
</table>
            <p class="h4">Maximum 5 values</p>

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">2</td>
        <td class="number">42</td>
        <td class="number">3.2%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3</td>
        <td class="number">20</td>
        <td class="number">1.5%</td>
        <td>
            <div class="bar" style="width:48%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">4</td>
        <td class="number">22</td>
        <td class="number">1.7%</td>
        <td>
            <div class="bar" style="width:52%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">5</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:15%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">8</td>
        <td class="number">9</td>
        <td class="number">0.7%</td>
        <td>
            <div class="bar" style="width:22%">&nbsp;</div>
        </td>
</tr>
</table>
        </div>
    </div>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_survived">survived<br/>
            <small>Boolean</small>
        </p>
    </div><div class="col-md-6">
    <div class="row">
        <div class="col-sm-6">
            <table class="stats ">
                <tr class="">
                    <th>Distinct count</th>
                    <td>2</td>
                </tr>
                <tr>
                    <th>Unique (%)</th>
                    <td>0.2%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (%)</th>
                    <td>0.0%</td>
                </tr>
                <tr class="ignore">
                    <th>Missing (n)</th>
                    <td>0</td>
                </tr>
            </table>
        </div>
        <div class="col-sm-6">
            <table class="stats ">
                <tr>
                    <th>Mean</th>
                    <td>0.38197</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div class="col-md-3 collapse in" id="minifreqtable-6456693858158561434">
    <table class="mini freq">
        <tr class="">
    <th>0</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 61.8%">
            809
        </div>

    </td>
</tr><tr class="">
    <th>1</th>
    <td>
        <div class="bar" style="width:62%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 38.2%">
            500
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable-6456693858158561434, #minifreqtable-6456693858158561434"
        aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable-6456693858158561434">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">0</td>
        <td class="number">809</td>
        <td class="number">61.8%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1</td>
        <td class="number">500</td>
        <td class="number">38.2%</td>
        <td>
            <div class="bar" style="width:62%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div><div class="row variablerow">
    <div class="col-md-3 namecol">
        <p class="h4 pp-anchor" id="pp_var_ticket">ticket<br/>
            <small>Categorical</small>
        </p>
    </div><div class="col-md-3">
    <table class="stats ">
        <tr class="alert">
            <th>Distinct count</th>
            <td>939</td>
        </tr>
        <tr>
            <th>Unique (%)</th>
            <td>71.7%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (%)</th>
            <td>0.0%</td>
        </tr>
        <tr class="ignore">
            <th>Missing (n)</th>
            <td>0</td>
        </tr>
    </table>
</div>
<div class="col-md-6 collapse in" id="minifreqtable6114187472754448460">
    <table class="mini freq">
        <tr class="">
    <th>CA. 2343</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.8%">
            &nbsp;
        </div>
        11
    </td>
</tr><tr class="">
    <th>CA 2144</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.6%">
            &nbsp;
        </div>
        8
    </td>
</tr><tr class="">
    <th>1601</th>
    <td>
        <div class="bar" style="width:1%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 0.6%">
            &nbsp;
        </div>
        8
    </td>
</tr><tr class="other">
    <th>Other values (936)</th>
    <td>
        <div class="bar" style="width:100%" data-toggle="tooltip" data-placement="right" data-html="true"
             data-delay=500 title="Percentage: 97.9%">
            1282
        </div>

    </td>
</tr>
    </table>
</div>
<div class="col-md-12 text-right">
    <a role="button" data-toggle="collapse" data-target="#freqtable6114187472754448460, #minifreqtable6114187472754448460"
       aria-expanded="true" aria-controls="collapseExample">
        Toggle details
    </a>
</div>
<div class="col-md-12 extrapadding collapse" id="freqtable6114187472754448460">

<table class="freq table table-hover">
    <thead>
    <tr>
        <td class="fillremaining">Value</td>
        <td class="number">Count</td>
        <td class="number">Frequency (%)</td>
        <td style="min-width:200px">&nbsp;</td>
    </tr>
    </thead>
    <tr class="">
        <td class="fillremaining">CA. 2343</td>
        <td class="number">11</td>
        <td class="number">0.8%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">CA 2144</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">1601</td>
        <td class="number">8</td>
        <td class="number">0.6%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">347082</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">3101295</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">S.O.C. 14879</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">347077</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">PC 17608</td>
        <td class="number">7</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">19950</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="">
        <td class="fillremaining">113781</td>
        <td class="number">6</td>
        <td class="number">0.5%</td>
        <td>
            <div class="bar" style="width:1%">&nbsp;</div>
        </td>
</tr><tr class="other">
        <td class="fillremaining">Other values (929)</td>
        <td class="number">1235</td>
        <td class="number">94.3%</td>
        <td>
            <div class="bar" style="width:100%">&nbsp;</div>
        </td>
</tr>
</table>
</div>
</div>
    <div class="row headerrow highlight">
        <h1>Correlations</h1>
    </div>
    <div class="row variablerow">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmQAAAIZCAYAAAAIrSOjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzs3XlcVdX%2B//HXYTYREAU0hzQnxBHUHDNFTTPLrrdy%2BNqVrKxEDNKyLMvMhnvTNIcs6zrdrItXS027PxXLRhscUkRRQ8oxgeQgqMzn9wdxrkex0I17o76fj8d5HFh7%2BKy9FPicz15nHZvD4XAgIiIiIpZxs7oDIiIiItc6JWQiIiIiFlNCJiIiImIxJWQiIiIiFlNCJiIiImIxJWQiIiIiFlNCJiIiImIxJWQiIiIiFlNCJiIiImIxJWQiIiIiFvOwugMiUnGaNWt2wW2enp4EBATQsmVL7rrrLvr27YvNZjOxdyIiciE2fZalyNWjNCFr3bo1QUFBLtvy8vI4cOAAR48eBaBnz57MmjULLy8v0/spIiKulJCJXEVKE7K5c%2BfSu3fvMvdJSEjgiSee4PTp04wcOZIJEyaY2UURESmD5pCJXGN69%2B7NuHHjAPjggw/Iy8uzuEciIqI5ZCLXoFtvvZUXX3yRM2fOsHv3bsLDw122b968maVLl/Ljjz9it9vx9fUlNDSUv/71r9xxxx1lntNut7Nw4UI%2B//xzfvnlF/Lz8/H396d169bcf//9dOzY8bxjIiMjOXLkCO%2B88w55eXnMmDGDQ4cOsWjRItq1awfAvn37WLBgAVu2bOH48eN4eHgQHBzMTTfdxPDhw8ucN5ednc3ixYvZuHEjv/zyCwUFBdSsWZOIiAiioqJo1aqVy/6HDx%2BmV69eAOzcuZOUlBTmzZvH9u3bsdvtBAcH06tXL%2BLi4rjuuusuacxFRP6IKmQi16CAgADn1ydPnnTZNmPGDKKiotiwYQO%2Bvr507NiRwMBANm/ezPjx44mNjaWoqMjlmPT0dAYNGsRbb73FgQMHCAsLo1OnTnh5efHZZ58xYsQIVqxYccH%2BHDhwgLi4ODw9PenUqRM%2BPj4AfP/99/z1r3/lo48%2BIi8vj3bt2hEeHk5OTg7Lli3j3nvvZfPmzS7nOnLkCH/5y1%2BYPXs2P/30E6GhoXTq1AmHw8GaNWu49957Wb58%2BQX7sm3bNoYNG0ZSUhKhoaE0bNiQI0eOsGTJEmJiYso9xiIiF8UhIleNpk2bOpo2berYsGHDH%2B6XkpLi3Hfnzp3O9vXr1zuaNm3q6NChg%2BO7775zOeb77793dOnSxdG0aVPHwoULXbZNnTrV0bRpU0ffvn0dGRkZzvbCwkLHSy%2B95GjatKmjXbt2jpycHJfjevbs6WjatKkjMjLSMW/evPP6ec899ziaNm3qePXVVx1FRUUu550xY4ajadOmjgEDBrgcM2zYMEfTpk0dgwYNchw/ftzZXlRU5Jg9e7ajadOmjpYtWzoOHDjg3Hbo0CHnePTo0cMxf/58R3FxsXP7Rx995Ny%2BZ8%2BePxpaEZFLogqZyDVo/fr1APj7%2B9O8eXNn%2B7x58wCYMGECN910k8sxHTp04MknnwRg8eLFLtuCg4O5/fbbGTNmDDVq1HC2u7u7ExcXh5ubG9nZ2fz4449l9qe4uJhRo0ad175nzx4ABg0ahJvb/35dubu7M3bsWMaOHct9991Hfn4%2BADt27GDLli0A/OMf/yA4ONh5jJubG2PGjKFFixbk5%2Bfz73//u8y%2BNGnShIceeshlSZCBAwcSGBjojCEiUtE0h0zkGvP555/z9ttvA/Dggw/i4VHya%2BD48eMkJSUB0KdPnzKP7d27NzabjaNHj5KamkrDhg0BeOihhy4Yr0qVKtSoUYP09HTS09PL3KdTp04uCVcpPz8/MjIy%2BOSTT3jsscdctrm5uREdHe3S9uWXXwIl7zZt1KjRBa8hKSnpvFudpcqaI2ez2ahXrx4nTpwgMzOzzONERIxQQiZyFXr77bf58MMPXdry8/P5%2BeefOXToEFBSdXrwwQed2/ft2%2Bf8%2BqmnnrrguT08PCgoKODnn392JmSl5//888/ZtWsXaWlpnDx5Esfvq%2BpkZ2cDJZWwsoSEhJTZPmLECKZPn86bb77Jl19%2ByYABA%2BjcufMFF8D96aefgJIq14XceOONQMm8tbLUr1%2B/zHZvb28ACgoKLnhuEZFLpYRM5Cq0c%2BfO89rc3d2pXr06vXr1YvDgwdxyyy0u27Oyspxfb9y48U9jlCZZAMnJyURHR3P48OFL6q%2B/v3%2BZ7aW3Md9%2B%2B20SExNJTEwEICgoiH79%2BjFixAjq1at3Xp/8/PwuGKtatWpASWKVm5vrfANBKS2UKyJWUEImchX6o4VhL6R0zpSnpyeJiYnl/lil3NxcHn30UY4ePUqDBg0YPXo0nTt3pnr16nh6egL/W97iz2KXZdSoUQwZMoSEhAQ%2B//xzvvnmG9LT0/nXv/5FfHw8//jHP7jtttvKfZ2Os9bCLus2qYiIFZSQiQjwv6UwCgoKyMzMdE5i/zNffPEFR48exWazMX/%2BfG644Ybz9snNzTXUNz8/PwYNGsSgQYMoKirim2%2B%2BYe7cuWzfvp1nnnmGTp06Ub16dWel7dylPM5Wus3Hx0fVMBGpNPTyUEQAaNq0qfPr/fv3l/u4n3/%2BGSiZe1VWMnbw4EF%2B%2B%2B03w/0r5e7uzs0338ySJUsICQnh1KlTzlu0pXPHzp4Pd67SbX80z0xExGxKyEQEKJmX1aJFCwCWLVtW5j6pqakMHDjQuTwG/G9O1oU%2Bgmnu3LnOr89dUPaP7Nixg4kTJ7JgwYIyt3t5eVGzZk3gfxW40nlx%2B/btKzMpKy4udi75cfPNN5e7LyIil5sSMhFxeuSRRwBYs2YNixYtcplv9csvvzB27FiSk5M5duyYsz00NBSAX3/9lYSEBGf7mTNnmDp1KomJic6PZrrQOxvL4u7uzooVK5g1axabNm06b/uGDRvYs2cPnp6eREREABAWFka3bt0AmDhxIidOnHDuX1hYyGuvvUZKSgrVqlVjyJAh5e6LiMjlpjlkIuJ06623MmrUKObPn88rr7zCkiVLuPHGG8nMzGTPnj0UFRURFhbG%2BPHjnceEh4fTrVs3vvrqK2JiYmjTpg3e3t7s2rULDw8PFi5cyNq1a9m%2BfTtLlixh7969PProo3To0OEP%2B9KyZUtGjhzJggULePjhh6lTpw433HADbm5uHD582Hmr9JlnniEoKMh53Msvv8yIESNITEwkMjKSpk2b4u3tzf79%2B8nMzMTHx4fp06dfcKkNERErKCETERfjxo2jS5cuvPfee/z4449s3rwZb29vWrZsSf/%2B/Rk2bNh5k%2BFnzpzJtGnT2LhxI7t27SI4OJi%2BffvyyCOPUL9%2BfWrVqsXu3bvZtm0b%2B/fvL/c7OCdMmECHDh1YuXIlu3btYvv27RQWFhIUFMSAAQMYPnz4eR%2BMHhISwvLly1m0aBEbNmxg//79FBYWEhISwq233soDDzxQ5lw3EREr2Rxn35MQEREREdNpDpmIiIiIxZSQiYiIiFhMCZmIiIiIxZSQiYiIyFXpyy%2B/pEuXLsTFxf3hfsXFxcyYMYNevXrRoUMHHnjgAQ4dOuTcbrfbiY2NpUuXLnTr1o1nnnnG8CeQnEsJmYiIiFx13nnnHaZOnVqud1UvXbqUjz/%2BmPnz5/PZZ5/RoEEDoqOjnWsxTpo0iTNnzrBmzRpWrFhBSkoK06ZNq9D%2BKiETERGRq463tzfLly8vV0IWHx9PVFQUjRo1wtfXl7i4OFJSUtixYwcZGRkkJCQQFxdHYGAgISEhjB49mhUrVlBQUFBh/dU6ZCIiIlLppKWlkZ6e7tIWFBREcHBwuY7/29/%2BVq79cnNz%2BemnnwgLC3O2%2Bfr6csMNN5CYmEh2djbu7u40a9bMub1FixacPn2aAwcOuLQboYTsUpRzUcsK1bAh7N8PTZpAaqrp4VetNHe5uuuug969ISEBTp82NTQAR4%2BaH7NaNRg2DN5/H7KzzY//6LAscwPabCUXnZ0NViyHeN115scE8PCAwkJLQsc96WlqvBo1YOJEePllqMDPly%2B3l182P6bNBt7ekJdnzX/rKlXMjwlclr%2BL8bNmMWfOHJe2MWPGEBMTU6FxsrKycDgc%2BPv7u7T7%2B/uTmZlJQEAAvr6%2BLgtal%2B6bmZlZYf1QQnalCAgAd/eS52uAp2fJz7enuX8/LOXtDW5uJc9WJGSms9n%2B97iW1qe24gWdRapUKfk/bVmSYJFr6J/4sho8eDCRkZEubWd/TFpF%2B6N18s1YQ18JmYiIiBjjVvFT0oODg8t9e9KIgIAA3NzcsNvtLu12u50aNWoQGBhITk4ORUVFuLu7O7cB1KhRo8L6oUn9IiIics3y9vamSZMmJCUlOdtOnjzJwYMHad26Nc2bN8fhcJCcnOzcnpiYiJ%2BfHw0bNqywfighExEREWPc3Cr%2BcRkdP36cfv36OdcaGzp0KEuWLCElJYWcnBymTZtG8%2BbNadWqFYGBgfTt25eZM2dy4sQJfv31V%2BbOncvdd9%2BNh0fF3WjULUsREREx5jInUJeiVatWABT%2B/iaahIQEoKS6VVBQQGpqKvn5%2BQAMGTKE9PR07rvvPk6dOkXHjh1d3lAwZcoUnn/%2BeXr16oWnpycDBgz408VmL5YSMhEREbnqJCYmXnBb3bp12bt3r/N7m83G2LFjGTt2bJn7V6tWjddff73C%2B3g2JWQiIiJiTCWskF1pNIIiIiIiFlOFTERERIxRhcwwJWQiIiJijBIywzSCIiIiIhZThUxERESMUYXMMI2giIiIiMVUIRMRERFjVCEzTAmZiIiIGKOEzDCNoIiIiIjFVCETERERY1QhM0wjKCIiImIxVchERETEGFXIDFNCJiIiIsYoITNMIygiIiJiMVXIRERExBhVyAzTCIqIiIhYTBUyERERMUYVMsMq5Qh%2B%2BOGHdO3a1epuiIiISHm4uVX84xpz7V2xiIiISCWjW5YiIiJizDVY0apol3UEDx8%2BTLNmzVi3bh233347rVu3Zvjw4aSnpwPw1Vdfceedd9K2bVsGDhzI5s2byzzPV199xaBBgwgPD%2Bfmm29m1qxZzm0ZGRlER0fTsWNHIiIiiIqK4tChQwCkpqYSFRVF%2B/bt6dChA2PGjCEzM/NyXrKIiIjIRTOlQvbee%2B%2BxYMECfHx8GDNmDJMnT%2Ba5554jJiaGl156iT59%2BvDxxx8THR3Np59%2B6nLs6dOniYmJYeLEidx9993s27ePIUOG0LJlSyIjI3njjTfw9/fniy%2B%2BoKioiFdffZW///3vzJkzhxdffJGIiAjeffddTp06xYQJE5g3bx4TJ04sd9/T0tKcCWSpoIYNCQ4IqJCxKbfQUNdnk/n7mxvP19f12Wz5%2BebHLP0vZfZ/LSezX%2BGWxtMra9PUrWtuvOBg12ez2WzWxbQitsNhfkwn/RwbZkpCNmzYMEJCQgCIiooiNjaWtWvXUq9ePfr37w/AoEGD8Pb2pri42OXY6667ji%2B%2B%2BIKqVatis9lo1qwZzZo1Y9euXURGRnLy5EkCAgLw8vLCZrMxefJk3H7/j3Hy5El8fHzw8PDA39%2BfN99807mtvOLj45kzZ45L25jHHiPmsccudTiMef99S8L2sCQqtG9vUWAL9eljVeRq1oStWtWauFby9LQk7LhxloTlvvusiWslb2/zY545Y35MJyVkhpmSkDVs2ND5dZ06dcjPz%2BfQoUPUPefl2u23317m8f/9739ZtGgRR44cobi4mIKCAtr//pf6wQcf5NFHH%2BXLL7%2BkW7du3HbbbXTu3BmAMWPG8MQTT7By5Uq6devGgAEDaN269UX1ffDgwURGRrq0Bd1xByxefFHnMSw0tCQZGzYMkpPNjQ1sen2bqfF8fUuSsS1bICfH1NAAnFMUNUVAQEkytmED2O3mx7%2BnX7a5Ad3cSpKxU6fgnBdipvDxMT8mlCRjBQWWhJ4%2By9xEMDi4JBn7178gLc3U0ABER5sf02YrScby8iyuWMkVx5SE7Oyql%2BP3/6EOh%2BO8alhZNm/ezOTJk5k2bRp9%2BvTB09OTYcOGObe3atWKTz/9lC%2B//JJNmzYxZswY7r33XiZMmECPHj3YtGkTn3/%2BORs3bmT48OE8%2BeSTDB8%2BvNx9Dw4OJvjcentqarmPr3DJybB9u%2Blhs7JMDwmUJGNWxM7IMD9mKbvdovhWJEWlca2KfY05fNiauGlp1sS2MiFyOK6xhEwVMsNMGcGDBw86vz5y5Ag%2BPj40aNCA1HMSm/fee885Ib/Uzp07adiwIf3798fT05O8vDxSUlKc2%2B12O56envTq1YsXX3yRefPm8e9//xuAzMxMqlatSv/%2B/Zk%2BfTovvPAC8fHxl/FKRURERC6eKQnZBx98QEZGBna7ncWLF3PLLbcwYMAAjh07xrJly8jPz2ft2rW8/vrrVD1nPkmdOnX49ddfOXbsGBkZGUyePJng4GCOHz8OwJAhQ3jnnXfIy8ujoKCAHTt2cMMNN5Cbm0vfvn1ZtWoVhYWF5ObmkpSURP369c24ZBERkWuHFoY1zJQrvvPOOxkxYgQ333wzAM8//zw1a9bkn//8J4sWLaJDhw7Mnz%2BfuXPnEhgY6HJs37596d69O/3792fw4MH06NGDRx99lISEBF577TVmzpzJZ599RqdOnejSpQubN29m2rRp%2BPj48MYbb7Bo0SLat29Pjx49%2BPXXX3nuuefMuGQREZFrhxIyw0yZQ9a2bVvWrl17XnuHDh345JNPzmsfNGgQgwYNAsDT05MZM2act0/puzOhpAJXls6dO/PRRx9dardFRERETKGV%2BkVERMSYa7CiVdGUkImIiIgxSsgMu6wJWd26ddm7d%2B/lDCEiIiJyxVOFTERERIxRhcwwjaCIiIiIxVQhExEREWNUITNMCZmIiIgYo4TMMI2giIiIiMVUIRMRERFjVCEzTCMoIiIiYjFVyERERMQYVcgMU0ImIiIixighM0wJmYiIiFx1jhw5wgsvvMCOHTu47rrr6N%2B/P%2BPGjcPtnORx5MiR/PDDDy5thYWFREdHM2bMGO677z62bdvmclzDhg1ZvXp1hfZXCZmIiIgYUwkrZDExMbRo0YKEhAR%2B%2B%2B03Hn74YWrWrMn999/vst%2BCBQtcvj958iT9%2B/enT58%2BzrYXX3yRQYMGXdb%2BVr4RFBERETEgMTGR5ORkxo8fT7Vq1WjQoAFRUVHEx8f/6bEzZ86kT58%2BNGvWzISe/o8qZCIiImLMZaiQpaWlkZ6e7tIWFBREcHDwnx6blJREnTp18Pf3d7a1aNGC1NRUcnJy8PX1LfO4X375hZUrV5KQkODS/sknn/Duu%2B9y7Ngx2rRpw5QpU6hfv/4lXNWFqUImIiIixri5VfgjPj6eQYMGuTzKU%2BECsNvt%2BPn5ubSVJmeZmZkXPG7%2B/Pn89a9/JTAw0NnWqFEjmjRpwvvvv8/GjRsJDAzkwQcfJD8//xIG6sJUIRMREZFKZ/DgwURGRrq0BQUFlft4h8NxUfHsdjurVq3iv//9r0v75MmTXb6fMmUKHTt2ZOvWrXTu3PmiYvwRJWQiIiJizGW4ZRkcHFyu25NlCQwMxG63u7TZ7XZsNptL9etsGzdupGHDhtSrV%2B8Pz%2B3r64u/vz/Hjx%2B/pL5diG5ZioiIyFWlZcuWHDt2jBMnTjjbEhMTady4MVWrVi3zmI0bN9K1a1eXtpycHCZPnuySfJ04cYITJ078aeJ2sZSQiYiIiDGXYQ6ZEWFhYbRq1Yrp06eTk5NDSkoKCxcuZOjQoQD069ePLVu2uByzZ88e6tat69Lm6%2BvLjh07mDp1Kna7naysLF544QWaNWtGeHi4oT6eSwmZiIiIGFPJEjKAWbNmkZaWRteuXfnb3/7GXXfdxbBhwwBITU3l9OnTLvunp6dTs2bN884zd%2B5cHA4Hffv2pUePHhQUFDB//vzzFpg1yua42FlvwqpV5sf094cePWDTJsjKMj/%2BwLts5gYMD4dt2yAiArZvNzc2kGU3/8fCzQ2qVYPsbCguNj08Pj7mxrPZwMsL8vPBit9C3ifT/3yniubhAdWrQ2YmFBaaH3/3bnPj%2BfpCu3awdSvk5JgbG0gPizA9poeHG9WrVyUz8xSFheb%2BIAcFVTM1nou%2BfSv%2BnOvWVfw5KzFN6hcRERFjKuFK/VcajaCIiIiIxVQhExEREWNUITNMCZmIiIgYo4TMMI2giIiIiMVUIRMRERFjVCEzTCMoIiIiYjFVyERERMQYVcgMU0ImIiIixighM0wjKCIiImIxVchERETEGFXIDNMIioiIiFhMFTIRERExRhUyw5SQiYiIiDFKyAzTCIqIiIhYTBUyERERMUYVMsM0giIiIiIWU4VMREREjFGFzDAlZCIiImKMEjLDNIIiIiIiFlOFTERERIxRhcwwJWQiIiJijBIywzSCIiIiIhZThUxERESMUYXMMI2giIiIiMVUIRMRERFjVCEzrNKN4MiRI5k5c2aFnzclJYVmzZpx%2BPDhCj%2B3iIjINc3NreIf15hKVyFbsGCB1V0QERERMVWlS8hERETkCnMNVrQq2kWN4Pz58%2BnZsydt2rShb9%2B%2BrFq1iu%2B%2B%2B45mzZqRl5fn3C8uLo6nnnoKgA8//JABAwbw6quv0rZtW%2BbNm0dkZKTLeXfv3k3z5s05fvw49913H9OmTePzzz%2Bnbdu25ObmOvc7ceIEYWFh/PjjjwC899573HbbbbRp04bbb7%2BdhIQE576//fYbDz74IOHh4dx%2B%2B%2B3s3Lnz4kdHRERExATlrpBt27aNJUuWsGzZMmrXrs3XX39NTEwML7300p8em5aWhre3Nz/88ANZWVnMnj2b5ORkQkNDAdiwYQPt27cnJCTEeUyXLl3w8vLiq6%2B%2Bonfv3gB8%2Bumn1KpVi7Zt27J%2B/XrmzJnDu%2B%2B%2BS2hoKJ9%2B%2BimxsbGsX7%2Be66%2B/npdffpm8vDw2bdpEbm4u48ePv9ixcfY9PT3dpa2gIIiaNYMv6XyXytfX9dl04eHmxvv9/4bz2WRWvNgrjWnVC02bzZp4Zsd18rDgBoG7u%2Buz2cz%2BBVKliuuzyTw8zP9hcnd3c3m%2BZqhCZli5fyNlZ2fj5uaGj48PNpuNbt26sXXrVn744YdyHfvQQw/h6elJzZo1ad%2B%2BPQkJCc6ELCEhgaFDh7oc4%2BnpSa9evdi4caMzIUtISOC2224DYPny5dx99920bNkSgFtvvZV27dqxZs0aRo0aRUJCAjNmzMDf3x9/f3%2BGDx/O999/X97LdYqPj2fOnDkubdHRY7j77piLPldFaN/ekrCwbZs1cd9/35Kw1SyJWqJqVQuDW8DT06LAXtUtCgz4%2BVkTt107a%2BKGhVkS1sJ/Yfz8rElCLaOEzLByJ2SdO3cmLCyMyMhIOnfuTPfu3Rk4cGC5jvXz88P3rFdm/fr1Y9myZYwZM4ZffvmFlJQU%2BvXrd95x/fr1Y8KECRQVFZGbm8s333zD2LFjATh48CBff/01ixcvdu7vcDho3LgxmZmZ5ObmUrduXee2Bg0alPdSXQwePPi8W6x79gSxadMlne6S%2BfqWJGNbtkBOjrmxAXo8HmFuwNDQkmRs2DBITjY3NpD9ufkJqJtbSTJ26hQUF5seHm9vc%2BPZbCXJWEEBOBzmxgbwOpVpflB395Jk7ORJKCoyP/6BA%2BbGq1KlJBnbvRvOnDE3NpB5o/kVdnd3N/z8qnDy5BmKisz9Qa5e/Rp7NXeVKXdC5uXlxVtvvUVycjIbN25k6dKlLFiwgAkTJpy3b9E5v2g8zrk10LdvX6ZOncqRI0dYv349nTp1IjAw8LzzdOnSheLiYrZu3UpGRga1a9cm7PdXWj4%2BPowbN46RI0eed9zx48fP64fjEn/jBwcHExzsenvyp58gK%2BuSTmdYTo5FsbdvtyAoJcmYBbGtSIjOjm1FfCuSotK4lsQuLLQg6O%2BKiqyJb8WrOShJxiyIXVho3Q9yUVGxpfFNpwqZYeUewYKCAnJycggNDSU6OpqVK1dis9nYv38/AGfOevVz6NChPzxXjRo1aN%2B%2BPZs2bWLDhg3079%2B/zP1Kb1t%2B9tln5%2B1Xv3599u7d67L/0aNHcTgcBAYG4unpybFjx5zbfvrpp/JeqoiIiIipyp2QLViwgIceeohff/0VKFloNSsriy5duuDu7s66desoLCzko48%2BckmELuS2225j7dq17Nmzhz59%2Bvzhfl999RVfffWVS0I2ePBgPvnkEzZt2kRhYSHffvstAwYMYMeOHXh6etKpUyeWLFlCdnY2R44cYenSpeW9VBEREbkYWhjWsHJf8f3330/Tpk256667aNu2LbGxsYwfP542bdowfvx4Zs6cSadOndizZ88FK15nu/XWW/nxxx/p2rUr/v7%2BF9yvc%2BfOpKWlUatWLZo0aeJs79q1KxMmTGDKlClEREQwZcoUJk%2BeTNu2bQGc7/7s3r07Dz30ECNGjCjvpYqIiMjFUEJmmM1xqZOrrmGrVpkf098fevSATZusmUM28C6T1yYIDy95Z2dEhCVzyLLs5v9YuLlBtWqQnW3NHDIfH3Pj2Wzg5QX5%2BdbMIfM%2Bmf7nO1U0Dw%2BoXh0yM62ZQ7Z7t7nxfH1L3tm5daslc8jSw0x%2BMxIlS21Ur16VzMxTps8hCwqy8P3hTzxR8ed87bWKP2clppX6RURExJhrsKJV0TSCIiIiIhZThUxERESMUYXMMCVkIiIiYowSMsM0giIiInLVOXLkCKNGjaJjx4707NmT1157jeIy3jE1e/ZsmjdvTqtWrVweGRkZAOTl5fHcc8/RvXt3OnbsyNixY8nMrPhP%2BlBCJiIiIsZUwmUvYmJiCAkJISEhgYULF5KQkODycYtnGzhwIImJiS6PmjVrAjBjxgySkpKIj49n3bp1OBwOnn76acP9O5cSMhEREbmqJCYmkpyczPjx46lWrRoNGjQgKiqK%2BPj4izpPYWEhy5cvZ/To0dSuXZuAgABiY2PZtGmT82MaK4rmkImIiIgxl2EOWVpaGunprusFBgUFnff50mVJSkqiTp06LgvPt2jRgtTUVHJycvD19XXZf%2B/evQwZMoR9%2B/ZRu3Ztnn76abp168bBgwdj9oQ%2BAAAgAElEQVTJzs6mRYsWzn0bNWqEj48PSUlJhISEGLzK/1FCJiIiIsZchoQsPj6eOXPmuLSNGTOGmJiYPz3Wbrfj5%2Bfn0laanGVmZrokZLVq1aJevXqMGzeO4OBg4uPjeeSRR1i9ejV2ux3gvHP5%2BflV%2BDwyJWQiIiJS6QwePJjIyEiXtqCgoHIfX94PIrrnnnu45557nN9HRUWxdu1aVq9eTffu3S/qXEYoIRMRERFjLkOFLDg4uFy3J8sSGBjorG6Vstvt2Gw2AgMD//T4OnXqkJaW5tzXbrdTtWpV5/asrCxq1KhxSX27EE3qFxERkatKy5YtOXbsGCdOnHC2JSYm0rhxY5fECuDNN99k8%2BbNLm0pKSnUq1ePevXq4e/vT1JSknPbvn37yM/Pp2XLlhXaZyVkIiIiYkwlW/YiLCyMVq1aMX36dHJyckhJSWHhwoUMHToUgH79%2BrFlyxagpPr1wgsvcODAAfLy8liwYAEHDx7kL3/5C%2B7u7tx777289dZbHDt2jMzMTF5//XX69OnjXBajouiWpYiIiBhTCVfqnzVrFpMmTaJr1674%2BvoyZMgQhg0bBkBqaiqnT58GYNy4cUDJ3DG73U7jxo1ZtGgRtWrVAmDs2LGcOnWKgQMHUlhYSM%2BePZk8eXKF91cJmYiIiFx1atWqxTvvvFPmtr179zq/9vb2ZuLEiUycOLHMfb28vHj%2B%2Bed5/vnnL0s/SykhExEREWMqYYXsSqMRFBEREbGYKmQiIiJijCpkhikhExEREWOUkBmmERQRERGxmCpkIiIiYowqZIZpBEVEREQspgrZJTh61PyY%2Bfklz%2BnpkJFhfvws%2B%2BX/YNWzublBNSD7820UF5saGgD/AJv5QcPDYds2qt0SAdu3mx7%2B803m/hv7%2BkK7dpCYCDk5poYGoFat8n9IcUXx9oYG1eHnrOrk5Zkenmbl%2BAy/CuXjU/Ls5wdeXubGBoK8LPjl8XuZo7pHMbiZHD8rC/z9zY1ZShUyw5SQiYiIiDFKyAzTCIqIiIhYTBUyERERMUYVMsOUkImIiIgxSsgM0wiKiIiIWEwVMhERETFGFTLDNIIiIiIiFlOFTERERIxRhcwwJWQiIiJijBIywzSCIiIiIhZThUxERESMUYXMMI2giIiIiMVUIRMRERFjVCEzTAmZiIiIGKOEzDCNoIiIiIjFVCETERERY1QhM0wjKCIiImIxVchERETEGFXIDFNCJiIiIsYoITNMIygiIiJiMVXIRERExBhVyAzTCIqIiIhYTBUyERERMUYVMsOUkImIiIgxSsgM0wiKiIiIWEwVMhERETFGFTLDNIIiIiIiFlOFTERERIxRhcywSp%2BQJSYm8sorr7Bv3z68vLzo06cPzz77LJ6envznP/9hxowZ5OfnM3jwYOx2O0VFRbz66qsAvPfeeyxdupSjR49St25d4uLi6N27t8VXJCIicpVRQmZYpU/I4uLiuPPOO/nXv/7F8ePHGTJkCI0bNyYiIoJJkybxxhtv0KNHD9555x3%2B85//EBkZCcD69euZM2cO7777LqGhoXz66afExsayfv16rr/%2B%2BnLHT0tLIz09/ZzWIGrWDK7Aq/xzAQGuz2Yz%2B2etNJ5lP%2BPh4ebHDA11fTaZr6%2B58apUcX02m7e3%2BTG9vFyfTefmY2680kG2YrDBml8gVv7yKi42P6ZUGJvD4XBY3Yk/kpOTg5eXF16//wYbN24cHh4eNGjQgP/3//4fq1atAqCoqIjIyEg6d%2B7Mq6%2B%2ByqhRo2jatCnjx493nmvEiBF07dqVUaNGlTv%2B7NmzmTNnjktbdPQYxo6NqYCrExERqSBZWeDvb03s//634s95220Vf85KrNJXyL799lvmzp3Lzz//TGFhIYWFhfTr14/09HTq1Knj3M/d3Z2wsDDn9wcPHuTrr79m8eLFzjaHw0Hjxo0vKv7gwYOdVbdSX3wRxH/%2Bc4kXdIkCAqBPH9iwAex2c2MD9Otnbjw3N6haFU6dsuZFX7VbIswPGhoK778Pw4ZBcrLp4be%2Bs83UeFWqQFgY7N4NZ86YGhqAGjXMj%2BnlBddfD0ePQn6%2B%2BfEbFOw3N6C3N9SvDwcPQl6eubEBatUyP6bVv7zkilWpE7KUlBQee%2BwxJkyYwL333ouPjw9PPPEEhYWFFBcX4%2BHh2n23s0rEPj4%2BjBs3jpEjRxrqQ3BwMMHBrrcnv/gCMjIMnfaS2e3WxLbq90pxsUWxt2%2B3IOjvkpMtiZ%2BTY3pIoCQZsyK22bdoz5afb01%2BQn6uBUEpudhcC2JbmRBZ9svLIppDZlilHsE9e/bg5eXF3/72N3x8fHA4HOzZsweAGjVqcPToUee%2BRUVF7N692/l9/fr12bt3r8v5jh49SiW/QysiInLlcXOr%2BMc1plJfcZ06dcjNzWXPnj1kZWXx2muv4eXlRVpaGh07dmTXrl1s2rSJ/Px85s2bR%2B5Zr8AGDx7MJ598wqZNmygsLOTbb79lwIAB7Nixw8IrEhERETMcOXKEUaNG0bFjR3r27Mlrr71G8QWqlh988AF9%2B/YlPDycgQMHkpCQ4Nz21FNPERYWRqtWrZyP9u3bV3h/K/Uty/DwcP7v//6P4cOHU6VKFR599FEmTpzIo48%2Byvvvv09sbCzjx4/H09OTESNG0LFjR2w2GwBdu3ZlwoQJTJkyhYyMDOrWrcvkyZNp27atxVclIiJylamEFa2YmBhatGhBQkICv/32Gw8//DA1a9bk/vvvd9lv3bp1TJ8%2BnbfffpvWrVuzcuVKYmNj%2Be9//0u9evUAePTRR4mJubxv5qvUCRnAs88%2By7PPPuvS9sMPPwCQn5/PI4884mwfPny4S9Y6fPhwhg8fbk5HRUREpFJITEwkOTmZhQsXUq1aNapVq0ZUVBSLFy8%2BLyHLzc3l8ccfp127dgDcc889TJs2jR9//NGZkJmh0idkF3Lo0CH69evH7Nmz6dGjB9988w3bt2/n8ccft7prIiIi15bLUCErax3QoKCg895oV5akpCTq1KmD/1nLgLRo0YLU1FRycnLwPetdPQMHDnQ59uTJk5w6dYqQkBBn27fffsvGjRv55ZdfaNSoEZMnT6Zly5aXemllumITsnr16vHqq6/y2muv8fjjjxMSEsLzzz9PRIQFyxWIiIhcyy5DQhYfH3/eOqBjxowp161Du92On5%2BfS1tpcpaZmemSkJ3N4XDw7LPP0qZNG2666SagJN9wc3Pjscceo2rVqsyZM4eRI0eybt06qlevfimXVqYrNiEDuOOOO7jjjjus7oaIiIhUsLLWAQ0KCir38Re7qkJBQQFPPfUUP/30E0uWLHG2R0dHu%2Bz3xBNPsGbNGhISErjnnnsuKsYfuaITMhEREakELkOFrKx1QMsrMDAQ%2BzmrqNvtdmw2G4GBgeftn5uby%2BjRozlz5gxLly79w8qXu7s7tWvXJi0t7ZL6diGV720RIiIiIga0bNmSY8eOceLECWdbYmIijRs3pmrVqi77OhwO4uLi8PDwYNGiRS7JmMPh4JVXXiH5rE9Pyc/P5%2BDBgxU%2B4V8JmYiIiBhTyRaGLV03bPr06eTk5JCSksLChQsZOnQoAP369WPLli0AfPzxx/z000%2B88cYbeHt7u5zHZrNx%2BPBhXnjhBY4fP86pU6eYNm0anp6e9O7d21Afz6VbliIiImJMJVyHbNasWUyaNImuXbvi6%2BvLkCFDGDZsGACpqamcPn0agBUrVnDkyBHnJP5SAwcOZOrUqbz00kv8/e9/Z9CgQeTk5NC6dWsWL17MddddV6H9VUImIiIiV51atWrxzjvvlLnt7I9WXLx48R%2BeJyAggFdeeaVC%2B1YWJWQiIiJiTCWskF1plJCJiIiIMUrIDNMIioiIiFhMFTIRERExRhUywzSCIiIiIhZThUxERESMUYXMMCVkIiIiYowSMsM0giIiIiIWU4VMREREjFGFzDCNoIiIiIjFVCETERERY1QhM0wJmYiIiBijhMwwjaCIiIiIxVQhExEREWNUITNMIygiIiJiMZvD4XBY3YkrTlaW%2BTHd3KBaNcjOhuJi08Pn%2BfibGs9mAy8vyM8HK/6Hfvut%2BTF9faFdO9i6FXJyzI9/Sw%2BbuQHDw2HbNoiIgO3bzY0NsGiR%2BTEDA%2BGOO%2BDjj%2BHECfPj33STufF8fKBhQ0hNhdxcc2MDxwKamx7TwwOCgiA9HQoLTQ9P7drmxwRg//6KP2eTJhV/zkpMtyxFRETEGN2yNEwjKCIiImIxVchERETEGFXIDNMIioiIiFhMFTIRERExRhUyw5SQiYiIiDFKyAzTCIqIiIhYTBUyERERMUYVMsM0giIiIiIWU4VMREREjFGFzDAlZCIiImKMEjLDNIIiIiIiFlOFTERERIxRhcwwjaCIiIiIxVQhExEREWNUITNMCZmIiIgYo4TMMI2giIiIiMVUIRMRERFjVCEzTCMoIiIiYjFVyERERMQYVcgMU0ImIiIixighM0wjKCIiImIxVchERETEGFXIDNMIioiIiFhMFTIRERExRhUywyrdCP7www%2B0atWK/Px8Dh8%2BTLNmzUhJSbG6WyIiInIhbm4V/7jGVLor7tChA4mJiXh5eVndFREREblCHTlyhFGjRtGxY0d69uzJa6%2B9RnFxcZn7LlmyhL59%2BxIREcHQoUPZtWuXc1teXh7PPfcc3bt3p2PHjowdO5bMzMwK72%2BlS8hERETkClMJK2QxMTGEhISQkJDAwoULSUhIYPHixeft9%2BmnnzJ79mz%2B8Y9/8M0339CzZ08eeeQRTp8%2BDcCMGTNISkoiPj6edevW4XA4ePrppw3371yWJmTz58%2BnZ8%2BetGnThr59%2B7Jq1Sq%2B%2B%2B47mjVrRl5ennO/xMREBgwYQHh4OCNGjOD48eMAnDlzhgkTJtC5c2fCw8MZMmSIM6udPXs2UVFRvPnmm3Ts2JF27drxxhtvWHKdIiIiYp7ExESSk5MZP3481apVo0GDBkRFRREfH3/evvHx8QwaNIg2bdrg4%2BPDgw8%2BCMBnn31GYWEhy5cvZ/To0dSuXZuAgABiY2PZtGmTMxepKJZN6t%2B2bRtLlixh2bJl1K5dm6%2B//pqYmBheeuml8/ZdtmwZ8%2BfPp2rVqkRHRzNp0iTmz5/P4sWLycjIYMOGDXh5efHOO%2B8wadIkPvroIwB27NhBeHg4X375JYmJiTzwwAO0aNGC3r17l7ufaWlppKenu7QFValCcFCQsQG4WKWvFiy6r26zWRPP7LilfH3Nj1mliuuz6cLDzY0XGur6bLbAQPNj%2Bvu7PpvNx8fceKVTTyyaguJhwV%2B40phWxC4sND%2Bm02X421Tm39%2BgIIKDg//02KSkJOrUqYP/WT9rLVq0IDU1lZycHHzP%2BiWflJRE//79nd%2B7ubnRvHlzEhMTad68OdnZ2bRo0cK5vVGjRvj4%2BJCUlERISIiRS3RhWUKWnZ2Nm5sbPj4%2B2Gw2unXrxtatW/nhhx/O2/f//u//uP766wGIiooiNjaWwsJCTp48iaenJz4%2BPnh4eDB69GhGjx7tPM7NzY3o6Gg8PDxo164d3bp1Y9OmTReVkMXHxzNnzhyXtjHR0cSMHXuJV25Q1aqWhLVqRp%2BnpzVx27WzJi5AWJhFgbdtsybu%2B%2B9bE9dK3btb3QNz1aljSViTXza7qF7d/JjHjpkfs5SDin/1XObf3zFjiImJ%2BdNj7XY7fn5%2BLm2lyVlmZqZLQma3210St9J9MzMzsdvtAOedy8/Pr8LnkVmWkHXu3JmwsDAiIyPp3Lkz3bt3Z%2BDAgWXu26hRI%2BfX9evXp6CggN9%2B%2B41hw4bxwAMPcMstt3DzzTfTu3dvevXq5bKvx1kvU66//np%2B/vnni%2Brn4MGDiYyMdGkLqlIFsrMv6jyGubmVJGOnTsEFJiVeTvne1UyNZ7OVJGMFBeBwmBoagMRE82NWqVKSjO3eDWfOmB%2B/3UMR5gYMDS1JxoYNg%2BRkc2MDvPCC%2BTH9/UuSsS%2B%2BgKws8%2BO3bGluPC%2BvkmTsyBHIzzc3NpDu29D0mB4eJclYZqbFFaurQJl/fy/i7pTjIv54/Nm%2BF3OuS2VZQubl5cVbb71FcnIyGzduZOnSpSxYsIAJEyact6/bWaXQ0kHx9vYmJCSETz75hO%2B%2B%2B45PP/2U5557jtWrVzNr1iwAioqKXM7jcDiwXeQ9sODg4PPLo1lZliRFQElcC2JbkRSVxrUidk6O%2BTFLnTljUfzt2y0ISkkyZkXsEyfMj1kqK8ua%2BLm55seEkmTMgtiFJt%2BhdYldeG0lZJfjz1KZf3/LKTAw0FndKmW327HZbASeM12hevXqZe7bpEkT5752u52qZ92hysrKokaNGpfUtwuxbFJ/QUEBOTk5hIaGEh0dzcqVK7HZbOclUQCpqanOrw8dOoSPjw8BAQGcOnWKoqIiunTpwrPPPst//vMf1q1b5ywjHjt2jMKzfiKOHj1aofd7RURE5H%2B1gop8GNGyZUuOHTvGibNe%2BCQmJtK4cWOXxKp036SkJOf3RUVF7N69mzZt2lCvXj38/f1dtu/bt4/8/HxaVnDF2bKEbMGCBTz00EP8%2BuuvAKSkpJCVlcWxMm6CL126lPT0dLKzs1m8eLFzDtjYsWP5%2B9//Tk5ODsXFxWzfvp2AgADnveDCwkLeffdd8vPz2bJlC19//fV55U8RERG5uoSFhdGqVSumT59OTk4OKSkpLFy4kKFDhwLQr18/tmzZAsDQoUNZuXIlP/74I2fOnGHevHl4eXnRo0cP3N3duffee3nrrbc4duwYmZmZvP766/Tp04eaNWtWaJ8tu2V5//33c/ToUe666y5yc3OpXbs248ePp379%2BuftO2TIEEaMGMGxY8eIiIhg4sSJALz44ovOxdpsNhtNmjRh7ty5zlucTZo0obCwkJtvvpnCwkIeeOABevToYeZlioiIXPWsmsXzR2bNmsWkSZPo2rUrvr6%2BDBkyhGHDhgEld95K1xnr3r07jz/%2BOLGxsfz222%2B0atWK%2BfPn4/P7u5LHjh3LqVOnGDhwIIWFhfTs2ZPJkydXeH9tDjNmqllg9uzZfPnllyxbtqziT27FZFw3N6hWreTNBBb8z8/zMfdt%2BjZbyXzg/Hxr5pB9%2B635MX19S97duXWrNXPIbulh8hoj4eEl7%2ByMiLBmDtmiRebHDAyEO%2B6Ajz%2B2Zg7ZTTeZG8/HBxo2hNRUS%2BaQHQtobnpMDw8ICoL0dGvmkNWubX5MgLOWDq0w3t4Vf87KTB8uLiIiIoZUxgrZlUYJmYiIiBiihMy4q/azLGNiYi7P7UoRERGRCqYKmYiIiBiiCplxV22FTERERORKoQqZiIiIGKIKmXFKyERERMQQJWTG6ZaliIiIiMVUIRMRERFDVCEzThUyEREREYupQiYiIiKGqEJmnBIyERERMUQJmXG6ZSkiIiJiMVXIRERExBBVyIxThUxERETEYqqQiYiIiCGqkBmnhExEREQMUUJmnG5ZioiIiFhMFTIRERExRBUy41QhExEREbGYKmQiIiJiiCpkxikhExEREUOUkBmnhOxSXHeddbF9fCwJ621PNzeghwd4VcfrVCYUFpobG6hVK8j0mN7eJc81aoCvr%2BnhYdEic%2BMFBpY8v/ACnDhhbmyAqCjzY4aHwx13wPPPw/bt5sf/5htz41WtWvKcnQ2nTpkbG6hdN9v0mLi5AVUJuu6URVlKNQtiSkVQQiYiIiKGqEJmnCb1i4iIiFhMFTIRERExRBUy45SQiYiIiCFKyIzTLUsRERERi6lCJiIiIoaoQmacKmQiIiIiFlOFTERERAxRhcw4JWQiIiJiiBIy43TLUkRERMRiqpCJiIiIIaqQGacKmYiIiIjFVCETERERQ1QhM04JmYiIiBiihMw43bIUERERsZgqZCIiImKIKmTGKSETERERQ5SQGadbliIiIiIWU4VMREREDFGFzDhVyEREROSaYrfbiY2NpUuXLnTr1o1nnnmG3NzcC%2B6/fv167rzzTsLDw%2Bnbty/Lli1zbps9ezbNmzenVatWLo%2BMjIyL6pMqZCIiImLIlVYhmzRpEvn5%2BaxZs4aCggIee%2Bwxpk2bxrPPPnvevjt37mT8%2BPG8/vrr9OjRg6%2B//pro6GhuvPFG2rdvD8DAgQN59dVXDfVJFTIRERExpLi44h%2BXS0ZGBgkJCcTFxREYGEhISAijR49mxYoVFBQUnLe/3W7n4Ycfpnfv3nh4eHDLLbfQtGlTtmzZUqH9UoVMREREKp20tDTS09Nd2oKCgggODjZ03j179uDu7k6zZs2cbS1atOD06dMcOHDApR2ge/fudO/e3fl9YWEh6enphISEONv27t3LkCFD2LdvH7Vr1%2Bbpp5%2BmW7duF9UvJWQiIiJiyOWoaMXHxzNnzhyXtjFjxhATE2PovHa7HV9fX2w2m7PN398fgMzMzD89ftq0aVx33XX0798fgFq1alGvXj3GjRtHcHAw8fHxPPLII6xevZobb7yx3P1SQiYiIiKVzuDBg4mMjHRpCwoKKtexq1at4sknnyxzW1xcHA6H46L743A4mDZtGmvWrGHJkiV4e3sDcM8993DPPfc494uKimLt2rWsXr2a2NjYcp//qk7I7rvvPtq0acP48eOt7oqIiMhV63JUyIKDgy/59uTAgQMZOHBgmdu%2B/vprcnJyKCoqwt3dHSipmgHUqFGjzGOKi4t5%2Bumn2blzJx988AH16tX7w/h16tQhLS3tovqsSf0iIiJiyJU0qb958%2BY4HA6Sk5OdbYmJifj5%2BdGwYcMyj3n55ZfZv39/mcnYm2%2B%2ByebNm13aUlJS/jRpO5cSMhEREblmBAYG0rdvX2bOnMmJEyf49ddfmTt3LnfffTceHiU3DkeMGMEnn3wCwNatW1m9ejXz588nICDgvPPZ7XZeeOEFDhw4QF5eHgsWLODgwYP85S9/uah%2BmZ6QHT58mGbNmrFu3Tpuv/12WrduzfDhw53vpFi9ejX9%2B/cnPDycyMhI3n//feexs2fP5uGHHyY2NpaIiAgAzpw5w6RJk%2BjYsSOdOnVyri1SqqioiOeee46IiAg6d%2B7sHGARERGpGFdShQxgypQpVKtWjV69enHnnXfSunVr4uLinNsPHTpEVlYWACtWrCA7O5uePXu6LPw6cuRIAMaNG0f37t2JioqiQ4cOrFmzhkWLFlGrVq2L6pPNcSkz2ww4fPgwvXr14qabbmLatGn4%2BPgwZswY/Pz8eOqpp7j11lv55z//SefOnfn2228ZOXIkH330EaGhocyePZv33nuPxx57jMGDB%2BPu7s5LL73Erl27mDt3LgAPPvggN998M3Fxcdx33338/PPPvPzyy3Ts2JE5c%2Bbw73//m2%2B%2B%2BcaZBf%2BZMt92W706weWcWFihPD2hjDVSTJGTY248d3fw84OTJ6GoyNzYwM9Z1U2P6eUF118PR4/CWa8pTNMg8WNzA/r7Q/fu8MUX8PsvPlM9/7z5MUND4f33YdgwOOt2iWkWLTI3XpUq0KQJ7N8PZ86YGxugUSPzY7q5lVz3mTPmr5ZaXAzVqpkb83fr1lX8Ofv2rfhzVmaWTeofNmyYcw2PqKgoYmNjmTVrFt9%2B%2B63z7aedO3emRo0aJCUlERoaCoC7uztDhw7FZrPhcDhYuXIlL7/8MoGBgUDJfd6TJ08640RERHDzzTcD0K9fP95%2B%2B21OnDhR7omCZb7tNjqamLFjjQ3ApfL0tCZudfMTFKAkKbNAA4suF0qSMks0uMOauGet72OqOyy6XihJyq4lTZpY3QPzValifszsbPNj/u5KW6m/MrIsITt74lydOnXIz88nKyuLZcuWsXz5ctLS0nA4HOTn57vcgqxVq5Zz7ZDMzExOnjxJ3bp1ndtLE7dSZ28rfYtq/kWUH8p822316tZUqlQhM40qZCZQhcz8%2BKqQXX5WVsgsdA1d6mVjWUJWfNa/Xuld0%2BXLlzN//nzefPNNOnTogLu7O7fccovLcWffanRzczvvXOc6e%2BG3S1Hm226tSoqsVFhoTdyiIkti5%2BWZHtIpP9%2Bi%2BCdOWBCUkmTMitjbt5sfs1RysjXxT50yPyaUJCdWxLYySzBjIpRcVSx7l%2BXBgwedXx85cgQfHx8OHz5M%2B/bt6dSpE%2B7u7qSnp//hOh4BAQH4%2BfmRmprqbEtKSmLVqlWXte8iIiLyP1fapP7KyLKE7IMPPiAjIwO73c7ixYu55ZZbqFOnDgcOHCArK4sjR44wdepUrr/%2Beo4fP37B8wwaNIh3332X48ePk5mZyYsvvsj%2B/ftNvBIRERERYyy7ZXnnnXcyYsQIDh48SNu2bXn%2B%2Befx9PTk%2B%2B%2B/dyZnkydPZteuXcycOfOCH5cwbtw4pk6dSv/%2B/fHy8qJ3796MGTPG5KsRERG5dl2LFa2KZllC1rZtW9auXXte%2Bz//%2BU%2BX7zt06MD999/v/P7cDxX18vJiypQpTJky5bxz/etf/3L5vlGjRuzdu9dIt0VEROQcSsiM00r9IiIiIha7qj9cXERERC4/VciMMz0hq1u3rm4bioiIiJxFFTIRERExRBUy45SQiYiIiCFKyIzTpH4RERERi6lCJiIiIoaoQmacKmQiIiIiFlOFTERERAxRhcw4JWQiIiJiiBIy43TLUkRERMRiqpCJiIiIIaqQGacKmYiIiIjFVCETERERQ1QhM04JmYiIiBiihMw43bIUERERsZgqZCIiImKIKmTGqUImIiIiYjFVyERERMQQVciMU0ImIiIihighM063LEVEREQspgqZiIiIGKIKmXFKyERERMQQJWTGKSG7BHFPepoes25dGDcOps/y5PBh08Mz467d5gb09YV27eDAAcjJMTc20Cww0PSYuPkATWhQsB/yc82Pf9NN5sbz8Sl5btkSci243m%2B%2BMT9m1aolz4sWwalT5sfv0sXceOHhsG0bREXB9u3mxgZysh2mx3SzwXXAaVtVim2mh8fX/JBSQZSQiYiIiCGqkBmnSf0iIqv8ZAUAACAASURBVCIiFlOFTERERAxRhcw4JWQiIiJiiBIy43TLUkRERMRiqpCJiIiIIaqQGacKmYiIiIjFVCETERERQ1QhM04JmYiIiBiihMw43bIUERERsZgSMhERETGkuLjiH5eT3W4nNjaWLl260K1bN5555hlyL/ARbh9%2B%2BCGhoaG0atXK5bFz587fr72YGTNm0KtXLzp06MADDzzAoUOHLrpPSshERETkmjJp0iTOnDnDmjVrWLFiBSkpKUybNu2C%2B3fo0IHExESXR%2BvWrQFYunQpH3/8MfPnz%2Bezzz6jQYMGREdH43Bc3GepKiETERERQ66kCllGRgYJCQnExcURGBhISEgIo0ePZsWKFRQUFFz0%2BeLj44mKiqJRo0b4%2BvoSFxdHSkoKO3bsuKjzKCETERERQ66khGzPnj24u7vTrFkzZ1uLFi04ffo0Bw4cKPOYY8eOcf/999OhQwd69erFqlWrAMjNzeWnn34iLCzMua%2Bvry833HADiYmJF9UvvctSREREKp20tDTS09Nd2oKCgggODjZ0Xrvdjq%2BvLzabzdnm7%2B8PQGZm5nn7BwYG0qBBAx5//HEaN27Mhg0bePLJJwkODubGG2/E4XA4jz/7fGWd648oIRMRkf/f3r3HRVnlfwD/zHAbBDFxQQXxki9DS0UINe%2BKGoQo6aKgRmpZP0MBodVdMwtvXbygKZpbromFLl5ITE0Cy2UxTVEMvBe6CQoMEshVLjPz%2B4Nl1gk1aC5nGD7v14sXzHmemfN9mOHhO99z5jxEWtFHRSs%2BPh4xMTEabQsWLEBoaOjv3jcxMRGLFy9%2B6LaIiIhmze8aPXo0Ro8erb49YcIEJCcnIyEhAX/5y18AoNnzxR6GCRkREREZncDAQHh5eWm0OTg4NOm%2B/v7%2B8Pf3f%2Bi2kydPory8HAqFAmZmZgDqq2YA0KFDhyY9vrOzMy5evIgnnngCUqlUff8GJSUlTX6sBkzIiIiISCv6qJA5OjpqPTz5MH369IFKpcLVq1fxzDPPAACysrJgZ2eHHj16NNp/z549aNeuHXx9fdVt2dnZcHFxgZWVFXr16oVLly5h0KBBAIDS0lLcunVL/SnMpuKkfiIiItJKS5rUb29vD29vb2zcuBG//vor8vPzsWXLFgQEBMDcvL5ONWvWLBw9ehQAUFNTg5UrVyIrKwu1tbU4fPgwUlNTERQUBACYPn06du3ahezsbJSXl2PdunXo06cP%2BvXr16y4WCEjIiKiVmXFihV49913MXbsWFhYWMDPzw8RERHq7Tk5Obh37x4A4OWXX0ZFRQXCw8NRWFiILl26YMuWLejbty8AICgoCIWFhQgODkZFRQUGDx7caO5bUzAhIyIiIq20tGtZtm3bFtHR0Y/c/u2336p/lkgkCAkJQUhIyEP3lUgkCAsLQ1hYmFYxcciSiIiISDBWyIiIiEgrLa1CZoyYkBEREZFWmJBpj0OWRERERIIZdUJ2%2BvRpjBw5UmPtDyIiIjIuLWnZC2Nl1AlZbGwsBgwYgMOHD4sOhYiIiEhvjHoOWXl5Odzc3CCVGnXeSERE1Kq1xoqWrhltpvPSSy/h7Nmz2LFjB7y9vZGWloYpU6bA3d0dI0aMwKZNm9T7JiQkwM/PDx988AEGDBiAgoICKJVKbNq0CePGjYObmxv%2B/Oc/49y5cwKPiIiIyDRxyFJ7Rlsh%2B%2BKLLxAcHAw3NzeEhIRg2LBheOuttxAQEIDr168jKCgIffv2VV94VC6Xw8rKCmfPnoWFhQU%2B%2B%2BwzHDlyBNu3b4eTkxPi4%2BPxxhtv4MSJE2jTpk2T45DL5SgsLNRos7Z2QIcOur%2B%2B1uM0XM5LD5f1ahpbW8P2Z22t%2Bd3QZDLD92llpfnd0MwNfDqwtNT8bmg2NobvU/Tr2t3dsP317q353cBEDK5IJP/7buj%2BW2MSY0qMNiF7UJs2bZCamgobGxtIJBK4urrC1dUVFy9eVCdkZWVleO2112BhYQEA2L9/P2bPno3u3bsDAIKDgxEbG4sTJ04060MC8fHxjS6BMH/%2BAoSFherm4JopOFhItwCeFdPt00%2BL6Vekrl1FR2BYzs6iIzC8Xr3E9Hv%2BvJh%2Bd%2B8W0m3T33rrnoicu7zc8H02YDKovRaRkAHA119/jZ07d%2BL27dtQKpWora2Fp6enerudnR1sH6ji3Lp1C6tXr8Z7772nblMqlcjLy2tWv4GBgeqkr0FcnAPWr/%2BDB/IHOTrWJ2Offw7I5YbtGwDeHG3g4V5r6/pk7PJloKrKsH0DgJ2d4fu0sqpPxm7dAqqrDd%2B/iAqZszNw%2BzZQU2PYvgGgrMzwfVpb1ydjP/0k5nU9e7Zh%2B%2Bvduz4ZmzEDuHrVsH0DqEwzfAIqkdQ/zVVVgEpl8O6pBWsRCdmpU6cQFRWFdevWYfz48bCwsMCMGTM09jH/zT8TmUyGVatWwdvbW6u%2BHR0d4fibccKqKiA3V6uH/cPkckF9i3rrVVUlpm9Rw2hAfTJ2/77h%2BzV0QtagpkbM8VZUGL7PBlVVYvrPyDB8n0B9MiagbxFVm4ZhSpWqdVWNWtOx6ovRTup/UGZmJnr06AFfX19YWFiguroa2dnZj72Pi4sLrl27ptGWKyqLIiIiMmGc1K%2B9FpGQOTs7Iz8/H3l5ebh79y6ioqLg6OiIgoKCR94nKCgIcXFxuHDhAhQKBY4ePQo/Pz/cuXPHgJETERER/b4WMWTp7e2N48ePw9fXF/b29li8eDFGjBiBpUuXYu3atejZs2ej%2BwQEBCAvLw8LFixAeXk5nnzyScTExMDJyUnAERAREZmu1ljR0jWjTsg%2B//xz9c8bNmxotP3BT0tOmTJFY5tUKkV4eDjCw8P1FyARERGRDhh1QkZERETGjxUy7TEhIyIiIq0wIdNei5jUT0RERGTKWCEjIiIirbBCpj1WyIiIiIgEY4WMiIiItMIKmfaYkBEREZFWmJBpj0OWRERERIKxQkZERERaYYVMe0zIiIiISCtMyLTHIUsiIiIiwVghIyIiIq2wQqY9VsiIiIiIBGOFjIiIiLTCCpn2mJARERGRVpiQaY9DlkRERESCsUJGREREWmGFTHuskBEREREJxgoZERERaYUVMu0xISMiIiKtMCHTHocsiYiIiARjhYyIiIi0wgqZ9iQqlUolOoiWpqrK8H1KJIBMBty/D4h4xsrLywzan7m5FO3b26C4uAJ1dYb/S3ewFHB2kUqBtm2BsjIhZ7e8ynYG7c/cHHBwAAoLgbo6g3YNAOhsa9jXNID659jGBqioEPIcl0vaGrQ/qRRo0waorBTzD9u2rcTwnbq7A%2BfPAx4eQEaG4fsX9C99wgTdP%2BaRI7p/TGPGChkRERFphRUy7TEhIyIiIq0wIdMeJ/UTERERCcYKGREREWmlpVXISkpKEBUVhTNnzkAqlWLUqFFYtmwZZDJZo33ffvttJCYmarQpFAr4%2B/vj/fffx9/%2B9jccOnQIZmZm6u1WVlZIT09vVkyskBEREVGrsmzZMlRVVeHw4cM4cOAAsrOzsW7duofuu2rVKmRlZam/MjIy8OSTT8LHx0e9zxtvvKGxT3OTMYAJGREREWlJqdT9l77cvXsXKSkpiIiIgL29PTp27IiQkBAcOHAAtbW1v3v/2NhYODk5YdSoUTqNi0OWREREpBV9JFByuRyFhYUabQ4ODnB0dNTqca9cuQIzMzO4urqq25555hlUVlbixo0bGu2/VVpaim3btmH37t0a7adPn8bx48fxyy%2B/oGfPnoiKikLfvn2bFRcTMiIiIjI68fHxiImJ0WhbsGABQkNDtXrckpIS2NraQiL53zp17drVr8NYXFz82Pt%2B8cUXGDhwIHr16qVuc3FxgVQqRXh4OGxsbBATE4NXXnkFSUlJaN%2B%2BfZPjYkJGREREWtFHhSwwMBBeXl4abQ4ODk26b2JiIhYvXvzQbREREfgja%2BIrFArExcVh/fr1Gu3z58/XuL1o0SIcPnwYKSkpmDp1apMfnwkZERERGR1HR8c/PDzp7%2B8Pf3//h247efIkysvLoVAo1J%2BMLCkpAQB06NDhkY959uxZ1NTUwNPT87F9m5mZoXPnzpDL5c2KmZP6iYiISCstaVJ/nz59oFKpcPXqVXVbVlYW7Ozs0KNHj0fe7/jx43juuedgbv6/WpZKpcL777%2Bv8Vg1NTW4desWXFxcmhUXEzIiIiLSSktKyOzt7eHt7Y2NGzfi119/RX5%2BPrZs2YKAgAB1sjVr1iwcPXpU435XrlxBly5dNNokEglyc3OxfPlyFBQUoKKiAuvWrYOFhQXGjRvXrLiYkBEREVGrsmLFCrRt2xZjx47FpEmT0L9/f0RERKi35%2BTk4N69exr3KSwsxJ/%2B9KdGj7V69Wp0794dU6ZMwdChQ3HlyhXExsaiTZs2zYqJc8iIiIhIKy1tpf62bdsiOjr6kdu//fbbRm1JSUkP3feJJ57A%2B%2B%2B/r3VMrJARERERCcYKGREREWmlpVXIjBETMiIiItIKEzLtcciSiIiISDBWyIiIiEgrrJBpjxUyIiIiIsFYISMiIiKtsEKmPSZkREREpBUmZNrjkCURERGRYKyQERERkVZYIdMeK2REREREghlFQpabmwtXV1dkZ2fr5PGGDRuGhIQEnTwWERERPZ5Sqfuv1oZDlkRERKSV1phA6ZpRVMiIiIiIWjOjSsiysrLg5%2BcHd3d3zJo1CwUFBQCA9PR0TJs2De7u7hg%2BfDg2bNgA5X/T8bq6OqxcuRKDBw/GiBEjsG/fPvXjbdmyBVOmTNHoIz09Hf3790d5ebnhDoyIiMiEcchSe0Y1ZLl371588sknsLGxwfz587Fs2TK89957ePXVV7F48WJMnToVP//8M1577TU4Ojpi5syZOHDgAI4dO4bdu3ejc%2BfO%2BPDDD3Hv3j0AgL%2B/PzZv3ozs7Gz07NkTAJCUlIQxY8bA1ta2STHJ5XIUFhZqtNnZOcDBwVG3B/87JBLN74Zmbm7Y3N3MTKrx3eBEdCuVan43MHMDnw0a%2BjN0v2oifs%2BCn2Opgc8fD563hByyu7vh%2B%2BzdW/O7IWVkGL7P/2qNCZSuGVVCNnPmTDg5OQEAZs%2BejYULFyIxMRFOTk6YOXMmAODpp5%2BGv78/vv76a8ycORPJycmYOHGiOuEKDw9HfHw8AKBLly7w9PTEV199hYULFwIAUlJSsHTp0ibHFB8fj5iYGI22%2BfMXICwsVOvj/SOsrIR0C5nMRki/dnbWQvoVykbM79qhrZBu0b69mH4BMb9nAIC1mNd1GyG9Cjtc4Px5QR0D2L3b8H2KesdOOmFUCVlDUgUAXbt2RW1tLW7evKnRDgDdunXD119/DQAoKCjA6NGj1dvs7e3Rrl079W1/f3/8/e9/x8KFC5GVlYWKigqMHDmyyTEFBgbCy8tLo83OzgH37zfnyLQnkdQnY9XVgEpl2L4BoKqqwqD9mZlJYWdnjdLSKigUhn/r1d5cwNs9qbQ%2BGauoEPJ2s/C%2BYTMyc/P6ZKy4GKirM2jXAACHNoZ9TQOof46trYGqKiHPcaXEsEmoRPK/wxVx3moz3MPwnfbuXZ%2BMzZgBXL1q%2BP4FYYVMe0aVkEkfqGmr/vvXK3lExt/QXlNTg7rfnM2VD7wyXnjhBaxatQoXLlzAd999Bx8fH1haWjY5JkdHRzg6ag5Pijq5APX9iui7rk7MX5tCoRTTt1Tg2UXQBAoRSVFDv0L6FvkfRNBzrDRwAaXhlK5SCfp1CxzCw9WrYvunFseoJvXfvHlT/XNOTg5kMhm6deuGGzduaOx348YNuLi4AKhPmPLz89Xb5HI5SktL1bdtbW0xduxYHDt2DF9//TUmTZqk56MgIiJqXTipX3tGlZDFxcWhsLAQZWVliI2Nxbhx4/DCCy8gJycH8fHxqKurQ2ZmJr788ktMnjwZADBixAgcPnwY//nPf1BeXo4NGzbA6jcTrfz9/bFv3z7U1tbi2WefFXFoREREJosJmfaMasgyKCgIs2bNQl5eHjw8PPDWW2%2BhQ4cOiImJwUcffYQPPvgAjo6OCA8Px4svvgigfvJ/Tk4Opk2bBktLS4SFheHcuXMajzt8%2BHBYW1vDz8/vkUOgRERERKJIVCpRs6EMp7y8HKNGjUJCQgK6deum9eNVVekgqGaSSACZDLh/X8wcsvLyMoP2Z24uRfv2NigurhAyh8zBUtCk/rZtgbIyIW8P8yrb/f5OOmRuDjg4AIWFYuaQdbY17GsagPAPbpRLDPvBDakUaNMGqKwUU/GwbSvgDbi7e/2nOz08xMwhE/Qv/b%2BziHQqJ0f3j2nMjGrIUh%2Bqq6uxYsUKDB8%2BXCfJGBEREZGumXRClp6ejoEDB6KoqAjvvvuu6HCIiIhMEueQac%2Bo5pDpmqenJzIzM0WHQUREZNJaYwKlayZdISMiIiJqCUy6QkZERET6xwqZ9lghIyIiIhKMFTIiIiLSCitk2mNCRkRERFphQqY9DlkSERERCcYKGREREWmFFTLtsUJGREREJBgrZERERKQVVsi0x4SMiIiItMKETHscsiQiIiISjBUyIiIi0gorZNpjhYyIiIhIMFbIiIiISCuskGmPCRkRERFphQmZ9jhkSURERCQYEzIiIiLSilKp%2By99y8rKwvjx4zFt2rTf3XfXrl3w9vaGh4cHpk%2BfjosXL6q3VVdX45133sHIkSMxePBghIWFobi4uNnxMCEjIiKiVuXQoUMIDQ1Ft27dfnffb7/9Fps3b8aaNWvw/fffY8yYMZg3bx4qKysBABs2bMClS5cQHx%2BPpKQkqFQqLFmypNkxMSEjIiIirbS0Cll1dTXi4%2BPh5ub2u/vGx8djypQpcHNzg0wmw9y5cwEA3333Herq6rB//36EhISgc%2BfOeOKJJ7Bw4UKcOHECBQUFzYqJk/qJiIhIK/pIoORyOQoLCzXaHBwc4OjoqPVjT506tcn7Xrp0Cb6%2BvurbUqkUffr0QVZWFvr06YOysjI888wz6u09e/aETCbDpUuX0LFjxyb3w4TsD7C2Nnyfcrkcn34aj8DAQJ28GJvL2rqtQfuTy%2BXYvHmHsOMVQS6XI37nTmHH3LmdYfurf47rX9OdO4t4jg37mgb%2B%2BxzvEPe6tjVwf3K5HP/4h7jzFlQqg3cpl8sRv3kzAo8dazXnLkA/v%2BrNm%2BMRExOj0bZgwQKEhobqvrPHKCkpQbt2mifIdu3aobi4GCUlJQAAOzs7je12dnbNnkfGIcsWorCwEDExMY3eLZiq1na8QOs75tZ2vEDrO%2BbWdrxA6zxmfQkMDERCQoLGV2BgYJPum5iYCFdX14d%2BJSQkNDsW1e9knL%2B3vSlYISMiIiKj4%2Bjo%2BIerjP7%2B/vD399dJHO3bt1dXwhqUlJSgV69esLe3V9%2B2sbFRb7937x46dOjQrH5YISMiIiJ6hL59%2B%2BLSpUvq2wqFApcvX4abmxtcXFzQrl07je3Xr19HTU0N%2Bvbt26x%2BmJARERERPcDHxwfp6ekAgOnTp%2BPgwYO4cOECqqqq8PHHH8PS0hKjR4%2BGmZkZpk2bhm3btiEvLw/FxcWIjo7G%2BPHj8ac//alZfXLIsoVwcHDAggUL4ODgIDoUg2htxwu0vmNubccLtL5jbm3HC7TOY26JvL29cefOHSgUCiiVSvTr1w8AcOzYMTg7O%2BPmzZvqdcZGjhyJyMhILFy4EEVFRejXrx8%2B%2BeQTyGQyAEBYWBgqKirg7%2B%2BPuro6jBkzBlFRUc2OSaLSxUw0IiIiIvrDOGRJREREJBgTMiIiIiLBmJARERERCcaEjIiIiEgwJmREREREgjEhIyIiIhKMCRkRERGRYEzIiIiIiARjQkZEREQkGBMyIiIiIsF4LUsS6s6dO03e18nJSY%2BREOmPUqnEr7/%2Bipqamkbb%2BLpu%2BSoqKmBjYyM6DGrheC1LI1ZSUoJt27bhb3/7GwAgLi4O8fHx6NatG5YtWwZHR0fBEWqvd%2B/ekEgkTdr3ypUreo7G8PLz83H48GHk5%2Bfj7bffBgBkZmaif//%2BgiPTn2%2B//RYnTpyAXC4HAHTq1AleXl4YOXKk4Mj04%2BjRo1i%2BfDlKS0s12lUqFSQSiUm%2Bru/fv4/vvvsO%2Bfn5mDNnDoD613qnTp0ER6Yfbm5u8PLywqRJkzBixAiYm7PWQc3HhMyIhYaGQqFQYOvWrcjKykJwcDCioqJw8eJFyOVybNq0SXSIWrtx44b658zMTBw4cADBwcHo3r07lEolfv75Z%2BzevRuzZ8/G888/LzBS3Tt%2B/DgiIiLg4eGBc%2BfOISsrC3l5efDz88OKFSswYcIE0SHq3KZNm/DZZ59h%2BPDhcHJygkqlwp07d3Dy5EnMnTsX8%2BfPFx2izg0bNgwBAQHw8fGBlZVVo%2B1PPvmkgKj05/z583jjjTdgZ2eHvLw8XLx4Ebdv34afnx%2B2bt2KIUOGiA5R59LT0/HNN98gJSUFFRUV8PHxwaRJk/Dss8%2BKDo1aEhUZrUGDBqlKS0tVKpVK9d5776nefPNNlUqlUlVVVamGDBkiMjS98PPzUxUUFDRqz83NVU2YMEFARPrl5%2BenSk5OVqlUKlW/fv3U7adOnTLJ41WpVCpPT0/VuXPnGrWfPXtW5enpKSAi/fPw8FDV1taKDsNgAgICVF988YVKpdJ8XR85ckQ1ZcoUUWEZTGZmpio6Olr1/PPPq8aMGaOKjo5W3bp1S3RY1AJwUr8RUyqVsLW1BQCcPHkSY8eOBQBYWFigqqpKZGh6cfv2bbRp06ZRe7t27XD79m0BEelXTk4OvLy8AEBj2HbgwIHIzc0VFZZemZmZoV%2B/fo3a3dzcYGZmJiAi/fPz88OZM2dEh2EwP/30EwIDAwFovq59fHw0KuKmql%2B/fhg7diy8vLxQWlqKAwcOYMqUKYiMjERxcbHo8MiIcaDbiPXt2xdbtmyBlZUV5HI5Ro8eDaB%2BTkqPHj3EBqcHHh4eCAkJwauvvgpnZ2fU1dUhPz8fu3btgru7u%2BjwdM7JyQnXrl1Dnz59NNrT0tLQoUMHQVHp16xZs/D3v/8dISEhkErr3w8qlUp89tlnCA4OFhyd7kRHR6t/btOmDZYsWQIPDw906dKl0ZzJyMhIQ4enVw4ODsjLy4OLi4tGe1ZWlvoNpim6efMmvvrqKxw%2BfBiFhYXw8vJCdHQ0hg8fjsrKSqxYsQKLFy/Gp59%2BKjpUMlJMyIzYu%2B%2B%2Bi5UrV6K0tBRr166FtbU1SkpKsGrVKpOYP/Zba9aswerVqxEeHo779%2B8DAMzNzTFkyBCsXr1acHS6N2PGDLz66qsICAiAQqHAzp07ce3aNRw9ehSLFy8WHZ5enDlzBj/%2B%2BCNiY2Ph4uICpVKJvLw81NbW4qmnnsK///1v9b7//Oc/BUaqnYyMDI3bXbt2xd27d3H37l2N9qZ%2BoKUlmThxIl577TXMmTMHSqUSKSkpuHr1KuLi4jBjxgzR4enFlClTcPXqVTz77LN4/fXX4ePjo5F82traYuXKlRg0aJDAKMnYcVJ/C1RdXf3QycGmpKSkBDU1NbC3tzfpTyx98803OHDgAG7dugWZTAYXFxcEBQVh6NChokPTi5iYmCbvu2DBAj1GQvqiUqmwc%2BfOh76uAwICTDIJ3bp1K/z9/eHs7PzY/c6dO8eJ/vRITMiMWE5ODtauXauuhq1Zs0a97MXatWvRs2dPwRHqXsMyEAUFBVi6dCkA018GorW7d%2B8e2rVrJzoMvamtrcWWLVswfPhweHp6AgAOHTqEn3/%2BGQsWLIClpaXgCHWrsLAQDg4OosPQu4MHDzZ53xdffFGPkZCpYEJmxF555RW4uLhg%2BfLlOH36NEJDQ7F161ZcuHABp0%2Bfxj/%2B8Q/RIepUa1sGYsmSJY/cJpVK0bFjR4wcORIDBgwwYFT6denSJSxbtgwJCQkAgPDwcCQlJaF9%2B/bYunWrSc4VfOedd3Dx4kV88MEHeOqppwAAly9fxooVK%2BDq6orly5cLjlC33N3dce7cOfUcQVM1fPhwjdulpaWora2FnZ0dVCoVSktLIZPJ0LFjRyQlJQmKkloSJmRGzNPTE2lpaZDJZHj33XehUqmwYsUK1NbWYvjw4fjhhx9Eh6hTEydORHh4OMaNG4f%2B/fsjMzMTAHD69GmsWrUKhw8fFhyhbr399ttITk6GtbU1nn76aUilUly%2BfBnV1dUYNGgQ7t69i4yMDERFRSEgIEB0uDoxffp0jBgxAiEhIUhJSUFUVBT27t2L8%2BfPY/fu3di9e7foEHVu6NChOHLkCNq3b6/RXlxcDD8/P5w8eVJQZPrx4YcfQiaTYe7cua1m9fp9%2B/bh0qVLCA8PVz/PcrkcGzduhLu7O6ZOnSo4QmoJTHdyjgkwMzNTLwWQlpamXsldpVKhtrZWZGh60dqWgXjiiScQHBzc6BOHH3/8MSwsLPD6668jLS0Nq1atMpmE7Pr16/j8888B1FdEfX194eTkhM6dO5tcpaiBQqF46Lyp2tpaVFdXC4hIv9LS0iCXy/HJJ5/Azs6u0XImaWlpgiLTn5iYGCQlJUEmk6nbHB0d8dZbb8HX15cJGTUJEzIjNnDgQCxfvhwWFhaoqalRl8h37tyJ3r17C45O91rbMhB79%2B5FWlqaxtCOVCrFa6%2B9hjFjxuD111/HsGHDUFBQIDBK3bKyskJtbS0kEgn%2B/e9/Y%2B3atQCAyspKKJVKwdHpx/PPP4/58%2BfjlVdegbOzM1QqFW7evInt27eb3DA8UD/VorW5f/8%2B8vLyGi1HVFRUZJJJN%2BkHEzIjtnz5cnz00UcoLi5WV03u3buHL7/8Ehs3bhQdns61tmUgLCwskJqainHjxmm0nzp1Sn0R6hMnTqBz584iwtOLkSNHIiwsDObm5rC1tcVzzz2H2tpabNiwAR4eHqLD04ulS5di/fr1WLJkifp6lnZ2dpgyZQrefPNNwdHp3uTJkx%2B5bf369QaMxHD8/PwQHByMiRMnokuXLlAoFMjLy8ORI0fg7e0tN47s9gAADLlJREFUOjxqITiHrIVav369SZ7MW9MyEPv27cM777yD3r17w9nZGebm5rhz5w6ysrIQERGB2bNnw8PDAx9%2B%2BKHJVFLu37%2BPnTt3oqysDDNmzICzszMqKysRGhqK1atXm%2BzFpxsUFxdDKpWa9KdKgfo3EhcvXlS/sQCAgoICJCcn4/z58wIj0w%2BFQoH9%2B/cjJSUF%2Bfn5qKmpgaOjI0aOHInZs2fDwsJCdIjUAjAhM3Kt6cTWGpe3uHz5MlJTU1FYWAilUokOHTpg8ODB2LNnD6Kjo5Gbm4suXbqIDlPnlEolioqKYGVlBTs7O9Hh6JWnpyfOnj1rkutvPczmzZuxY8cOuLq6IjMzE%2B7u7sjOzkbHjh0xb948vPDCC6JDJDJKHLI0Yo87sZniyvXTp09H586d4evrC19fX5OcJ/cghUKBjIwM/PLLL%2BqEu7S0FD/88AOuX78OACaXjBUWFmLZsmU4efIk6urqAAAymQzjxo3DkiVLYG9vLzhC3RsxYgT27t2rvr6jqdu/fz/27t2LXr16oX///oiLi0N1dTWWL19u0os879mzB0ePHsXt27chkUjQtWtXTJ48GZMmTRIdGrUQrJAZsVGjRmH79u3qE1tmZqb6xDZmzBiMHz9edIg6VVxcjOPHjyMlJQWnTp2Ck5OTOjkzxUVwo6Ki8N1338HT0xPHjh3DhAkTcOXKFVhaWmLp0qUmOadqzpw5qKurw%2BzZs9G1a1eoVCrcunULu3btgpWVlUle52/evHn48ccfYWZmhk6dOjVKSlryJaIexsPDQ129d3d3R3p6OszMzHD37l1Mnz4dycnJgiPUvY0bN2L//v3w9/dHt27dAADZ2dk4ePAgIiIiEBQUJDhCaglM9%2B2KCSgrK0OvXr0A1C%2BBoVAoYGVlhcjISEyfPt3kErL27dsjICAAAQEBqKioQGpqKpKTkzFjxgx06tQJiYmJokPUqZSUFOzfvx%2BdOnVCcnIy1qxZA5VKhXXr1uHatWsmmZBduHABqampaNu2rbrtqaeewuDBgzF69GhxgelR37590bdvX9FhGEz37t2RkJCAyZMnw8nJCSkpKfD29kZdXR2KiopEh6cXCQkJ%2BPTTTxt9QnzChAn461//yoSMmoQJmRFrjSe2Bm3atIGDgwM6deqEjh07Ij8/X3RIOlddXa2exG5mZoaamhpYWlri9ddfx8SJEzF9%2BnTBEepely5dUFlZqZGQAZq/C1PzuGtymuJCuG%2B%2B%2BSZCQ0Px/PPPY9asWYiMjMSTTz6J/Px8k026y8vL1W%2BeH/TMM89ALpcLiIhaIiZkRiwyMhJhYWEPPbGNGTNGdHg6V1NTg7S0NKSkpODEiRNQKBQYN24cFi1ahCFDhogOT%2BeeeuopxMTE4P/%2B7//Qo0cP7Nu3DzNnzkReXh4qKytFh6czN2/eVP88d%2B5cvPnmm5g5cyZ69uwJqVSKmzdvIi4uDqGhoQKj1K/r16/j0qVLjT6c89lnn2HGjBkCI9MNPz8/9ZU0Vq1ahe%2B//x4ymQzTpk2Di4sLsrKy4OzsDB8fH8GR6kevXr2wf//%2BRpWwhIQE9RAm0e/hHDIjV1VVBWtrawD161M1nNi8vb1NboKsu7s7LC0tMXbsWPj4%2BGDo0KEmd4wPysrKQmRkJBITE/H9999j4cKFsLS0RHV1NWbOnIm33npLdIg60bt3b0gkEvzeqUYikeDKlSsGispw9uzZg5UrV6JDhw64e/cuOnbsCLlcDmdnZ8ycOROzZ88WHaLWRo0aBXd3d3Tt2hU7duzAq6%2B%2B%2BsjnOzIy0sDR6V96ejrmzp0LZ2dn9XzX7Oxs5ObmYvPmzRg5cqTgCKklYEJGRiM1NdXkk7DHuXHjBq5cuQJnZ2eTuqD47du3m7yvs7OzHiMRY9y4cVi1ahWee%2B459YdzCgsLsXr1arz00kvw9PQUHaLWfvjhB8TGxqK8vBxnz5595DFJJBLs2rXLwNEZRlFRERITE/Gf//wHQP2UEx8fHzg5OYkNjFoMJmRGpuHySE1hCteE27RpE8LCwgAA0dHRj93XFN9Ztwa1tbXqhTEfHLJ7GEtLS0OEZFDu7u7IyMgAAAwYMAAZGRmQSCS4ffs25s2bh6%2B%2B%2BkpwhLoVHBysvl5pa9GwnEtaWpp6ORdra2uTXs6FdK91liKMmCmuvv84P/74o/rnhn9aD9NaFtU0RZ6enurnuX///o99Lk1xyNLJyQmnT5/Gc889BwcHB6Snp2PgwIFo27YtcnNzRYenc60tGQOARYsWQaFQ4KOPPmq0nMtf//pXk1zOhXSPFTIjV1paCoVCgfbt2wMAcnNzYWNjo75tSgoLC%2BHg4CA6DNKx9PR09RDWmTNnUFRUpL5YfFlZmfq6f3369MGgQYNEhqoXhw4dwpIlS3D69GnExcXh008/xcCBA3Hjxg107doV27dvFx0iacnd3b3Rci5A/et79OjROHfunKDIqCWRig6AHu306dPw8vLCqVOn1G3/%2Bte/MH78ePzwww8CI9OPUaNG4eWXX0Z8fDxKSkpEh0M68uB8ovz8fCxduhSDBg1Cv379sGbNGqxfvx4ff/wxcnJyBEapP5MmTUJSUhJsbW0RGBiIefPmoWPHjggICMCGDRtEh0c60LCcy2%2BZ8nIupHuskBmxyZMn4%2BWXX8bkyZM12o8cOYLt27fjyy%2B/FBSZfly%2BfBkpKSlITk7GzZs3MXjwYEyYMAHjx49v9M6TWqYXXngBb7/9NoYNG4Z//vOfiIuLw8GDB/Hzzz8jMjISR44cER2izhUVFSEqKgqpqamoqamBSqWCtbU1Ro0ahXfeeYfzi1qoB5dzyczMVC9b89vlXIKCgkx2uQ/SLSZkRuzBy448qLa2FoMGDXrsnKuW7pdffkFycjKSk5Nx9epVDBs2DFu3bhUdFmlpwIABuHDhAgAgJCQE/fr1wxtvvAFAc/K7KQkODoZEIsHs2bPVn7jLzc1FbGwspFIpYmNjBUdIf0RrX86FdI%2BT%2Bo1Y165dkZyc3Ojd1cGDB03%2Bo9TdunXDhAkTYG1tDXNzc6SmpooOiXTA3t4eBQUFsLS0xKlTpxAeHg6gfpFUmUwmODr9yMzMRFpamkaVt3fv3vD09MSoUaMERkbaOH78uOgQyMQwITNiixYtQmhoKLZt24YuXbpAqVTixo0byM/PN9mJwNeuXUNKSgqOHz%2BO69evw9PTExMnTsTmzZtFh0Y6EBQUhICAAJiZmWHw4MFwdXVFeXk5IiIiTHZYx8XFBffv32807K5QKODi4iIoKtKWKa6ZR2JxyNLIFRQU4OjRo8jNzYVKpUK3bt3g5%2Ben/pSaKRk7diwKCgrw7LPPwsfHB97e3pxfY4IyMjJQWlqKIUOGwNLSEnV1ddixYwfmzJmjXq/MlHzzzTf44osv8NJLL6F79%2B5QKpW4desW9uzZg0mTJmksAtyjRw%2BBkRKRSEzIjFjDZOB//etf6gU1ra2tMXr0aCxbtszkkpVt27Zh6tSpJplsUuvVu3fvx25vmIfEuUZErRsTMiPW2iYDu7u749y5c5BKuRoLmY7WfukoImoaJmRGzM3NrdFkYAAoKSnBqFGjNFa5NwUffvghZDIZ5s6dCxsbG9HhEBERGQwn9Rux1jYZOC0tDXK5HJ988gns7OwaLfdhCtfuJCIiehhWyIxYa5sM/HsL3f52gVwiIiJTwYTMiHEyMBERUevAhMyItbbJwEuWLHns9vfff99AkRARERkW55AZMVNIspqjurpa47ZCoUBOTg7y8vIwYcIEQVERERHpHxMyMhrR0dEPbf/yyy9x7do1A0dDRERkOByyJKOnUCgwZMgQnDlzRnQoREREesEKGRmNhqsRPOj%2B/ftISkoyyUvqEBERNWBCRkajf//%2BkEgkjdrNzMzwl7/8RUBEREREhsEhSzIaZ86cQVFRkfpalmVlZfjpp58wdOhQ9O/fX3B0RERE%2BsOEjIzGoUOHEBUVhfPnz6OqqgovvvgiAODevXtYtGgR/vznPwuOkIiISD94FWcyGh9//DE2b94MAEhMTISlpSWOHj2K2NhY7NixQ3B0RERE%2BsOEjIxGXl4ehg0bBgBITU2Fr68vzMzM4Orqijt37giOjoiISH%2BYkJHRsLe3R0FBAYqLi3Hq1Cl4eXkBAAoKCiCTyQRHR0REpD/8lCUZjaCgIAQEBMDMzAyDBw%2BGq6srysvLERERAR8fH9HhERER6Q0n9ZNRycjIQGlpKYYMGQJLS0vU1dVhx44dmDNnDtciIyIik8WEjIiIiEgwziEjIiIiEowJGREREZFgTMiIiIiIBGNCRkRERCQYEzIiIiIiwZiQEREREQnGhIyIiIhIMCZkRERERIL9Pyq4NsPNXzECAAAAAElFTkSuQmCC" class="center-img">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmQAAAIZCAYAAAAIrSOjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAIABJREFUeJzs3X98zfX///Hb2e8Ym7Gh4U3Y/FpMvGdILCJE%2BZAfkfVLYtNEb/JG6PebEPrxpoio91TvIvSVkXcpFZFmGZqVn9mwY4bZr/P9Y%2B3k2Gi85vWa3K%2BXyy5ne76er9fj%2BXpuO%2BdxHq8fx%2BZwOByIiIiIiGXcrB6AiIiIyPVOCZmIiIiIxZSQiYiIiFhMCZmIiIiIxZSQiYiIiFhMCZmIiIiIxZSQiYiIiFhMCZmIiIiIxZSQiYiIiFhMCZmIiIiIxTysHoCIlM6PP/7If//7X7Zv387Bgwc5e/Ys3t7eBAUF0axZM7p3705UVBQ2m83qoYqIyGWy6bMsRco3h8PBc889xzvvvAOAn58fISEh%2BPr6kpWVxa5du8jKygKgU6dOzJkzBy8vLyuHLCIil0kJmUg5t2zZMqZNm4aPjw9Tp07lrrvuwt3d3bk8Ozub//znP7z00ksUFBQwbNgwxowZY%2BGIRUTkcukcMpFy7r333gPg/vvv5%2B6773ZJxgB8fHyIjo7mkUceAWDp0qVkZ2ebPk4REblySshEyrn9%2B/cDEBoaesl%2B0dHRvPnmm6xbtw4fHx8Axo8fT2hoKC%2B99BKnT5/mhRdeICoqirCwMNq0aUNMTAx79uy56DY3b95MTEwM7du3p1mzZrRp04bo6Gg%2B%2BeSTi65jt9uZNWsWd999N%2BHh4TRt2pS2bdsyfPhwvv322xLXiYqKIjQ0lC%2B%2B%2BIJ169bRvXt3wsLC%2BP777wGYO3cuoaGhjB8/npycHObOnUvXrl25%2Beabue2223jmmWc4c%2BYMAHv37mXUqFG0a9eOsLAw7rrrLlauXFli3LNnz7JgwQLuvfdeWrVqRZMmTYiIiOCBBx5g3bp1Ja4zZMgQQkNDee%2B99zh9%2BjSzZs1yjqV169Y88sgj7Ny586LzIyJSEiVkIuVcQEAAAD/88MOf9rv11lupVq1asWWnT58mOjqa9957jypVqtC6dWvy8/NZt24d/fr1KzGBmDVrFtHR0axbtw5fX18iIiIICAhg8%2BbNjB07lri4OPLz813WSU9Pp0%2BfPrzxxhvs27ePJk2a0KZNG7y8vPj8888ZOnQoH3744UX3Yd%2B%2BfYwePRpPT0/atGnjTCzP9%2BSTT7Jw4UKCg4Np2LAhaWlpLF26lHHjxrFnzx4GDhxIcnIyjRo1IjAwkD179vDkk0%2ByceNGl%2B2cPXuWQYMGMWPGDJKSkqhfvz6RkZH4%2Bfnx9ddfExMTw9y5cy861pycHKKjo1m8eDE1a9akadOm5Ofn88UXXzBkyBBnIi0iUioOESnXxo0b5wgJCXGEhoY6XnrpJcfRo0cve92WLVs6evbs6bJuZmamo2/fvo6QkBBH3759Xdb77LPPHCEhIY7WrVs7vv32W5dl3333naNt27aOkJAQx6JFi1yWPfvss46QkBBH165dHceOHXO25%2BXlOZ577jlHSEiI45ZbbnFkZWW5rNepUydHSEiIIyoqyvH6668X2485c%2BY4QkJCHO3bt3f06tXLkZ6e7ly2bt065/x069bNMXfuXEdBQYHD4XA48vPzHSNHjnSEhIQ4HnroIZdtLlq0yBESEuJo06aNIzU1tcRljRs3duzfv99l2eDBgx0hISGOjh07OgYNGuQ4fvy4c1laWpqjXbt2jpCQEMfzzz9fbD9ERC5GFTKRci4uLo6aNWvicDh466236NixI4MHD2b27Nl8/fXXnD179k%2B3kZWVxZQpUwgKCnK2VapUifHjxwOFt9T45ZdfnMtef/11AMaNG8ff//53l221bt2af/zjHwAsXrzYZVlQUBA9evQgJiaGqlWrOtvd3d0ZPXo0bm5unDp16qLVvqKLEi4mLS2NqVOnulQBO3fuTGBgIA6HAw8PD0aOHOm89Yebmxv9%2B/cH4KeffnLZVsWKFbnrrrsYPnw4devWdVk2dOhQAgMDyc/PZ/PmzSWOJT09nZkzZzormACBgYHcddddAOzYseOi%2ByEiciHdh0yknKtRowbvv/8%2B06dPZ9WqVeTn57Nlyxa2bNnC66%2B/jqenJxEREfTq1YsePXrg4VH83zooKIhbbrmlWHt4eDgVK1bk9OnT/PDDD9StW5ejR4%2BSlJQEQJcuXUocU%2BfOnbHZbBw%2BfJjU1FTq1asH4LywoCQ33HADVatWJT09nfT09BL7tGnTBje3i79PDAwMpEWLFsXag4ODSU9Pp1OnTsXuwxYcHAzAyZMnXdr79etHv379Soxjs9moVavWJcf697//nerVqxdrr1OnDgAZGRkX3Q8RkQspIRO5BgQGBvKvf/2Lf/zjH6xbt47NmzezdetWjh8/Tm5uLps2bWLTpk0sWLCA1157zZkUFAkJCSlxu25ubgQHB7Nnzx4OHjwI4HKSf1EFrSQeHh7k5ubyyy%2B/OBMyKDy36n//%2Bx87d%2B4kLS2NzMxMHL/fXefUqVNAYSWsJCUlOOerVatWie1F910rSr5KWpaXl1dsWUFBAV999RXbt28nLS0Nu93uHFtqauolx1q7du0S2729vQHIzc291K6IiLhQQiZyDalWrRoDBw5k4MCBQOFJ8N9%2B%2By0rVqxg%2B/bt7N27l2HDhvHJJ5/g6enpXM/Pz%2B%2Bi26xUqRJQeOI/uFaS1q9f/6djKkqyAJKTkxk5cqQzubtclxon4LJPV7L8fIcPH2bkyJHFDmWWlm6%2BKyJlSQmZyDXspptu4qabbmLgwIEsXryY559/ntTUVNasWUPv3r2d/S51GLCoAlTUp%2BiQn6enJ4mJiaX%2BKKbs7Gwee%2BwxDh8%2BTN26dRkxYgSRkZFUqVLFmShFRUVx6NChi27DzI99GjVqFD/99BPVqlUjNjaWDh06UK1aNWeiNWTIEL777jvTxiMi1zclZCJ/EUOHDmXp0qXs37%2BfvXv3uiwr%2BmilkhQtK6qU%2Bfv7A4WH3DIyMlxOWr%2BUL774gsOHD2Oz2Zg/fz5/%2B9vfivUpLzesTUpKIjExEYAZM2YQGRlZrE95GauIXB90laVIObZu3TomT57M/PnzS9W/6JBf0XlMRX7%2B%2BecS%2B%2Bfn5zsrVkXnRJ1/vtmFid2lFF2lWadOnRKTsf3793P8%2BPFSb%2B9q%2BvXXXwGc9zu70OnTpy95w1wRkbKmhEykHEtMTCQ%2BPp758%2Bdz%2BPDhS/Y9evQoycnJAMWuRDxw4AC7du0qts7333/vvMN9eHg4UHgBQdOmTQFYvnx5ibFSU1Pp3bu38/YY8EeF7dy5cyWu8%2Bqrrzq/v/CGsmbz9fUFCg/XlnTy/VtvveWskJV0MYCISFlTQiZSjj3wwAMEBgZy6tQphg4dWuJHDzkcDr755hsefvhhcnNzadGiBe3atXPpU6lSJSZOnOhSobLb7bz44otA4e0mbrzxRuey4cOHA7Bq1Srefvtt51WSUFhdGjVqFMnJyRw5csTZ3qhRIwB%2B%2B%2B03EhISnO1nz57l2WefJTEx0Zn07du374rnpCyEhITg7u5Ofn4%2B7777rrM9Ly%2BPf//738THx9OpUyfgj6stRUSuJp1DJlKOValShYULFxIbG8svv/zC/fffT2BgIDfddBMVKlTAbrdz8OBB572ybrnlFubNm1fsJP6oqCgOHDjA7bffTlhYGJ6enuzYsYOsrCx8fX2ZPHmyS/877riDYcOGMX/%2BfF544QWWLFnCTTfdREZGBrt27SI/P58mTZowduxY5zrh4eG0b9%2BeTZs2ERsbS/PmzfH29mbnzp14eHiwaNEiVq9ezfbt21myZAm7d%2B/mscceo3Xr1ld/Ii9Qo0YN%2BvbtS3x8PC%2B88AIrV67E39%2BfXbt2cfr0aebNm8fBgwf5/PPPWbt2LUOGDGHQoEHceeedpo9VRK4PSshEyrmQkBA%2B%2BeQTVq9ezYYNG0hOTubHH38kJycHHx8fqlevTmRkJN27d6djx44lXqno5ubGwoULee211/jss884fPgwFStWpGvXrowePdrlPmJFxowZQ9u2bVm6dCk//PADmzdvxtvbm2bNmtG9e3cGDRpU7NYPs2fPZsaMGaxfv56dO3cSFBRE165dGT58OHXq1KFGjRr89NNPbNu2jb1795p6VeWFJk6ciJ%2BfH6tWrWLPnj1UrVqViIgIHn30URo3bkx2djbffvstX3zxBXv37nWpEoqIlDWbQ88yIn9Z48eP56OPPuKee%2B5xHp4UEZHyR%2BeQiYiIiFhMCZmIiIiIxZSQiYiIiFhMCZmIiIj8JX355Ze0bduW0aNHX7JfQUEBs2bN4vbbb6d169Y89NBDHDhwwLncbrcTFxdH27Ztad%2B%2BPf/85z/L/NM8dFK/iIiI/OUsWLCADz74gICAAGrUqMGsWbMu2vedd95h0aJFLFiwgOrVqzNr1iy2bNnCihUrsNlsxMbGkpOTwwsvvEBubi6PP/44zZo1Y%2BLEiWU2XlXIRERE5C/H29ubDz74oMSPcrtQfHw80dHR1K9fH19fX0aPHk1KSgo7duzg2LFjJCQkMHr0aAICAqhevTojRozgww8/LPGTPq6U7kMmIiIi5U5aWprzptdFAgMDCQoKKtX6999/f6n6ZWdn8/PPP9OkSRNnm6%2BvL3/7299ITEzk1KlTuLu7Exoa6lzetGlTzpw5w759%2B1zajVBCdiWsuJllvXqwdy80bAgWfJTLio/NPbJdoQJ07gwJCfD7Ry2aKi3N/JiVKsG998Ly5XDqlPnx%2B/Y1N56bG1SuDJmZUFBgbmwo/BuzgpcX5ORYE/uee8yNV6MGLFgAjzwCv/1mbmyADz80P6bNBt7ecO4cWHFC0A03mB8TuCqvi/Fz5jBv3jyXtpiYGGJjY8s0zsmTJ3E4HPj5%2Bbm0%2B/n5kZGRgb%2B/P76%2Bvi43si7qm5GRUWbjUEJ2rfD3B3f3wsfrgKdn4f%2B3p6fVIzGPl1dhknLBze//smy2P76uF%2Bfv8/Vw9m7FioVPWxUrWj0Sc11Pf9NXU//%2B/YmKinJpCwwMvGrxLnVKvRmn2yshExEREWPcyv6U9KCgoFIfnjTC398fNzc37Ha7S7vdbqdq1aoEBASQlZVFfn4%2B7u7uzmUAVatWLbNx6KR%2BERERuW55e3vTsGFDkpKSnG2ZmZns37%2Bfm2%2B%2BmcaNG%2BNwOEhOTnYuT0xMpHLlyiV%2BDvCVUkImIiIixri5lf3XVXT06FG6devmvNfYwIEDWbJkCSkpKWRlZTFjxgwaN25MWFgYAQEBdO3aldmzZ3PixAl%2B%2B%2B03Xn31Vfr27YuHR9kdaNQhSxERETHmKidQVyIsLAyAvLw8ABISEoDC6lZubi6pqank/H6FzYABA0hPT2fIkCGcPn2aiIgIlwsKpk2bxtNPP83tt9%2BOp6cnPXv2/NObzV4uJWQiIiLyl5OYmHjRZbVq1WL37t3On202G6NGjWLUqFEl9q9UqRIzZ84s8zGeTwmZiIiIGFMOK2TXGs2giIiIiMVUIRMRERFjVCEzTAmZiIiIGKOEzDDNoIiIiIjFVCETERERY1QhM0wzKCIiImIxVchERETEGFXIDFNCJiIiIsYoITNMMygiIiJiMVXIRERExBhVyAzTDIqIiIhYTBUyERERMUYVMsOUkImIiIgxSsgM0wyKiIiIWEwVMhERETFGFTLDNIMiIiIiFlOFTERERIxRhcywcjmD//3vf2nXrp3VwxAREZHScHMr%2B6/rzPW3xyIiIiLljA5ZioiIiDHXYUWrrF3VGTx48CChoaGsXbuWHj16cPPNNzN48GDS09MB2LRpE7169aJFixb07t2bzZs3l7idTZs20adPH8LDw7n11luZM2eOc9mxY8cYOXIkERERtGzZkujoaA4cOABAamoq0dHRtGrVitatWxMTE0NGRsbV3GURERGRy2ZKhWzp0qUsXLgQHx8fYmJimDJlCpMnTyY2NpbnnnuOLl268MknnzBy5Eg2bNjgsu6ZM2eIjY1lwoQJ9O3blz179jBgwACaNWtGVFQUr7zyCn5%2BfnzxxRfk5%2Bfz4osv8tJLLzFv3jyeeeYZWrZsyZtvvsnp06cZN24cr7/%2BOhMmTCj12NPS0pwJZJHAevUI8vcvk7kptUaNXB9N5udnbjxfX9dHs%2BXnmx%2Bz6E/K7D%2BtIu7u5sYrekNt1Rtrm826mFbEBqhf39x4tWq5PprtevsdOxzmx3RShcwwUxKyQYMGUb16dQCio6OJi4tj9erV1K5dm%2B7duwPQp08fvL29KSgocFm3QoUKfPHFF1SsWBGbzUZoaCihoaHs3LmTqKgoMjMz8ff3x8vLC5vNxpQpU3D7/Q8jMzMTHx8fPDw88PPz47XXXnMuK634%2BHjmzZvn0hbz%2BOPEPv74lU6HMe%2B%2Ba0nYjpZEhVatLApsoagoq0dgLquSbit5eloTd%2B5ca%2BKOG2dNXCt5e5sf8%2BxZ82M6KSEzzJSErF69es7vg4ODycnJ4cCBA9S64G1Tjx49Slz/008/5e233%2BbQoUMUFBSQm5tLq99fqR9%2B%2BGEee%2BwxvvzyS9q3b8%2Bdd95JZGQkADExMTz55JN8/PHHtG/fnp49e3LzzTdf1tj79%2B9P1AWvkIF33QWLF1/Wdgxr1KgwGRs0CJKTzY0NbJy5zdR4vr6FydjWrZCVZWpoAE6cMD%2Bmv39hMrZhA9jt5sfv3NnceG5uhb/nrCy44H2YKXx8zI9psxUmY7m51lQzxowxN16tWoXJ2EsvwcGD5sYGmD7d/Jg2W2Eydu6cxRUrueaYkpCdX/Vy/P4X6nA4ilXDSrJ582amTJnCjBkz6NKlC56engwaNMi5PCwsjA0bNvDll1%2ByceNGYmJiuPfeexk3bhwdO3Zk48aN/O9//2P9%2BvUMHjyYf/zjHwwePLjUYw8KCiIoKMi1MTW11OuXueRk2L7d9LAnT5oeEih8sbYi9vHj5scsYrdbE9%2BKw7RQmIxZEdvKF0uHw5r4KSnmx4TCZMyK2Nfj79gyqpAZZsoM7t%2B/3/n9oUOH8PHxoW7duqRekNgsXbrUeUJ%2BkR9//JF69erRvXt3PD09OXfuHCnn/Wfb7XY8PT25/fbbeeaZZ3j99df5z3/%2BA0BGRgYVK1ake/fuvPzyy0ydOpX4%2BPiruKciIiIil8%2BUhOy9997j2LFj2O12Fi9ezG233UbPnj05cuQIy5cvJycnh9WrVzNz5kwqVqzosm5wcDC//fYbR44c4dixY0yZMoWgoCCOHj0KwIABA1iwYAHnzp0jNzeXHTt28Le//Y3s7Gy6du3KihUryMvLIzs7m6SkJOrUqWPGLouIiFw/dGNYw0zZ4169ejF06FBuvfVWAJ5%2B%2BmmqVavGW2%2B9xdtvv03r1q2ZP38%2Br776KgEBAS7rdu3alQ4dOtC9e3f69%2B9Px44deeyxx0hISGD69OnMnj2bzz//nDZt2tC2bVs2b97MjBkz8PHx4ZVXXuHtt9%2BmVatWdOzYkd9%2B%2B43JkyebscsiIiLXDyVkhplyDlmLFi1YvXp1sfbWrVuzZs2aYu19%2BvShT58%2BAHh6ejJr1qxifYquzoTCClxJIiMj%2Beijj6502CIiIiKm0J36RURExJjrsKJV1pSQiYiIiDFKyAy7qglZrVq12L1799UMISIiInLNU4VMREREjFGFzDDNoIiIiIjFVCETERERY1QhM0wJmYiIiBijhMwwzaCIiIiIxVQhExEREWNUITNMMygiIiJiMVXIRERExBhVyAxTQiYiIiLGKCEzTAmZiIiI/OUcOnSIqVOnsmPHDipUqED37t0ZM2YMbhckjw8%2B%2BCBbtmxxacvLy2PkyJHExMQwZMgQtm3b5rJevXr1WLlyZZmOVwmZiIiIGFMOK2SxsbE0bdqUhIQEjh8/zqOPPkq1atV44IEHXPotXLjQ5efMzEy6d%2B9Oly5dnG3PPPMMffr0uarjLX8zKCIiImJAYmIiycnJjB07lkqVKlG3bl2io6OJj4//03Vnz55Nly5dCA0NNWGkf1CFTERERIy5ChWytLQ00tPTXdoCAwMJCgr603WTkpIIDg7Gz8/P2da0aVNSU1PJysrC19e3xPV%2B/fVXPv74YxISElza16xZw5tvvsmRI0do3rw506ZNo06dOlewVxenCpmIiIgY4%2BZW5l/x8fH06dPH5as0FS4Au91O5cqVXdqKkrOMjIyLrjd//nz%2B7//%2Bj4CAAGdb/fr1adiwIe%2B%2B%2By7r168nICCAhx9%2BmJycnCuYqItThUxERETKnf79%2BxMVFeXSFhgYWOr1HQ7HZcWz2%2B2sWLGCTz/91KV9ypQpLj9PmzaNiIgIvv/%2BeyIjIy8rxqUoIRMRERFjrsIhy6CgoFIdnixJQEAAdrvdpc1ut2Oz2VyqX%2Bdbv3499erVo3bt2pfctq%2BvL35%2Bfhw9evSKxnYxOmQpIiIifynNmjXjyJEjnDhxwtmWmJhIgwYNqFixYonrrF%2B/nnbt2rm0ZWVlMWXKFJfk68SJE5w4ceJPE7fLpYRMREREjLkK55AZ0aRJE8LCwnj55ZfJysoiJSWFRYsWMXDgQAC6devG1q1bXdbZtWsXtWrVcmnz9fVlx44dPPvss9jtdk6ePMnUqVMJDQ0lPDzc0BgvpIRMREREjClnCRnAnDlzSEtLo127dtx///3cfffdDBo0CIDU1FTOnDnj0j89PZ1q1aoV286rr76Kw%2BGga9eudOzYkdzcXObPn1/sBrNG2RyXe9absGKF%2BTH9/KBjR9i4EU6eND9%2B77tt5gYMD4dt26BlS9i%2B3dzYQNYp8/8t3NygQgU4cwYKCkwPj%2B/Z9D/vVJY8PKBKFcjIgLw8c2MDHDtmfkwfH6hXD1JTITvb/PgpKebGq1wZOnSAL76AzExzYwPpEbeZHtPDw40qVSqSkXGavDxz/5EDAyuZGs9F165lv821a8t%2Bm%2BWYTuoXERERY8rhnfqvNZpBEREREYupQiYiIiLGqEJmmBIyERERMUYJmWGaQRERERGLqUImIiIixqhCZphmUERERMRiqpCJiIiIMaqQGaaETERERIxRQmaYZlBERETEYqqQiYiIiDGqkBmmGRQRERGxmCpkIiIiYowqZIYpIRMRERFjlJAZphkUERERsZgqZCIiImKMKmSGaQZFRERELKYKmYiIiBijCplhSshERETEGCVkhmkGRURERCymCpmIiIgYowqZYUrIRERExBglZIZpBkVEREQspgqZiIiIGKMKmWGaQRERERGLqUImIiIixqhCZli5m8EHH3yQ2bNnl/l2U1JSCA0N5eDBg2W%2BbRERkeuam1vZf11nyl2FbOHChVYPQURERMRU5S4hExERkWvMdVjRKmuXNYPz58%2BnU6dONG/enK5du7JixQq%2B/fZbQkNDOXfunLPf6NGjGT9%2BPAD//e9/6dmzJy%2B%2B%2BCItWrTg9ddfJyoqymW7P/30E40bN%2Bbo0aMMGTKEGTNm8L///Y8WLVqQnZ3t7HfixAmaNGnCDz/8AMDSpUu58847ad68OT169CAhIcHZ9/jx4zz88MOEh4fTo0cPfvzxx8ufHRERERETlLpCtm3bNpYsWcLy5cupWbMmX331FbGxsTz33HN/um5aWhre3t5s2bKFkydPMnfuXJKTk2nUqBEA69ato1WrVlSvXt25Ttu2bfHy8mLTpk107twZgA0bNlCjRg1atGjBZ599xrx583jzzTdp1KgRGzZsIC4ujs8%2B%2B4wbb7yR559/nnPnzrFx40ays7MZO3bs5c6Nc%2Bzp6ekubbm5gVSrFnRF27tSvr6uj6YLDzc33u9/G85Hk1nxZs9m%2B%2BPRkjebHiYXzN3dXR/N5uNjfkwvL9dHs1WubG48i5%2B4PDzM/0dyd3dzebxuqEJmWKmfgU%2BdOoWbmxs%2BPj7YbDbat2/P999/z5YtW0q17iOPPIKnpyfVqlWjVatWJCQkOBOyhIQEBg4c6LKOp6cnt99%2BO%2BvXr3cmZAkJCdx5550AfPDBB/Tt25dmzZoBcMcdd3DLLbewatUqhg0bRkJCArNmzcLPzw8/Pz8GDx7Md999V9rddYqPj2fevHkubSNHxtC3b%2Bxlb6sstGplSVjYts2auO%2B%2Ba0nYCpZELXTDDRYFrlDFmrhmJwlFqli0vwDBwdbErVfPmrgtW1oS1sLfMJUrW/WPbBElZIaVOiGLjIykSZMmREVFERkZSYcOHejdu3ep1q1cuTK%2B571D6tatG8uXLycmJoZff/2VlJQUunXrVmy9bt26MW7cOPLz88nOzubrr79m1KhRAOzfv5%2BvvvqKxYsXO/s7HA4aNGhARkYG2dnZ1KpVy7msbt26pd1VF/379y92iHXXrkA2bryizV0xX9/CZGzrVsjKMjc2QMcnTH5CbdSoMBkbNAiSk82NDZzZZH4CarMVJmNnz4LDYXp4KpzLMDegu3thMpaZCfn55sYGsNvNj%2BnlVZiMHToEOTnmxz9wwNx4vr6Fydi2bZY8cWWE3WJ6THd3NypXvoHMzLPk5xeYGrtKlYqmxpOyVeqEzMvLizfeeIPk5GTWr1/PsmXLWLhwIePGjSvWN/%2BCJ1ePCw6FdO3alWeffZZDhw7x2Wef0aZNGwICAoptp23bthQUFPD9999z7NgxatasSZMmTQDw8fFhzJgxPPjgg8XWO3r0aLFxOK7wFS4oKIigINfDkz//DCdPXtHmDMvKsij29u0WBKUwGbMgdoG5z6PAH28wHQ5r4pOXZ0FQCpMxK2Kfd36q6XJyrImfmWl%2BTCh84rIgdl6eFf9IhfLzCyyNbzpVyAwr9Qzm5uaSlZVFo0aNGDlyJB9//DE2m429e/cCcPbsWWffA3/yLqxq1aq0atWKjRs3sm7dOrp3715iv6LDlp9//nmxfnXq1GH37t0u/Q8fPozD4SAgIABPT0%2BOHDniXPbzzz%2BXdldFRERETFXqhGzhwoU88sgj/Pbbb0DhjVZPnjxJ27ZtcXd3Z%2B3ateTl5fHRRx%2B5JEIXc%2Bedd7J69Wp27dpFly5dLtlv06ZNbNq0ySUh69%2B/P2vWrGHjxo3k5eXxzTff0LNnT3bs2IGnpyf6fHE%2BAAAgAElEQVRt2rRhyZIlnDp1ikOHDrFs2bLS7qqIiIhcDt0Y1rBS7/EDDzxASEgId999Ny1atCAuLo6xY8fSvHlzxo4dy%2BzZs2nTpg27du26aMXrfHfccQc//PAD7dq1w8/P76L9IiMjSUtLo0aNGjRs2NDZ3q5dO8aNG8e0adNo2bIl06ZNY8qUKbRo0QLAefVnhw4deOSRRxg6dGhpd1VEREQuhxIyw2yOKz256jq2YoX5Mf38oGNH2LjRmnPIet9tMzdgeHjhicAtW1pyDlnWKfP/LdzcoEIFOHPGmnPIfM%2Bm/3mnsuThUXilY0aGNeeQHTtmfkwfn8IrHVNTrTmHLCXF3HiVK0OHDvDFF5acQ5YecZvpMT083KhSpSIZGadNP4csMLCSqfFcPPlk2W9z%2BvSy32Y5pjv1i4iIiDHXYUWrrGkGRURERCymCpmIiIgYowqZYUrIRERExBglZIZpBkVEROQv59ChQwwbNoyIiAg6derE9OnTKSjhiqm5c%2BfSuHFjwsLCXL6O/X7hz7lz55g8eTIdOnQgIiKCUaNGkZFR9p9sooRMREREjCmHt72IjY2levXqJCQksGjRIhISElw%2BbvF8vXv3JjEx0eWrWrVqAMyaNYukpCTi4%2BNZu3YtDoeDp556yvD4LqSETERERP5SEhMTSU5OZuzYsVSqVIm6desSHR1NfHz8ZW0nLy%2BPDz74gBEjRlCzZk38/f2Ji4tj48aNzo9pLCs6h0xERESMuQrnkKWlpZGe7np/xMDAwGKfL12SpKQkgoODXW4837RpU1JTU8nKysLX19el/%2B7duxkwYAB79uyhZs2aPPXUU7Rv3579%2B/dz6tQpmjZt6uxbv359fHx8SEpKonr16gb38g9KyERERMSYq5CQxcfHM2/ePJe2mJgYYmNj/3Rdu91O5cqVXdqKkrOMjAyXhKxGjRrUrl2bMWPGEBQURHx8PMOHD2flypXY7XaAYtuqXLlymZ9HpoRMREREyp3%2B/fsTFRXl0hYYGFjq9Uv7QUT9%2BvWjX79%2Bzp%2Bjo6NZvXo1K1eupEOHDpe1LSOUkImIiIgxV6FCFhQUVKrDkyUJCAhwVreK2O12bDYbAQEBf7p%2BcHAwaWlpzr52u52KFSs6l588eZKqVate0dguRif1i4iIyF9Ks2bNOHLkCCdOnHC2JSYm0qBBA5fECuC1115j8%2BbNLm0pKSnUrl2b2rVr4%2BfnR1JSknPZnj17yMnJoVmzZmU6ZiVkIiIiYkw5u%2B1FkyZNCAsL4%2BWXXyYrK4uUlBQWLVrEwIEDAejWrRtbt24FCqtfU6dOZd%2B%2BfZw7d46FCxeyf/9%2B7rnnHtzd3bn33nt54403OHLkCBkZGcycOZMuXbo4b4tRVnTIUkRERIwph3fqnzNnDpMmTaJdu3b4%2BvoyYMAABg0aBEBqaipnzpwBYMyYMUDhuWN2u50GDRrw9ttvU6NGDQBGjRrF6dOn6d27N3l5eXTq1IkpU6aU%2BXiVkImIiMhfTo0aNViwYEGJy3bv3u383tvbmwkTJjBhwoQS%2B3p5efH000/z9NNPX5VxFlFCJiIiIsaUwwrZtUYzKCIiImIxVchERETEGFXIDFNCJiIiIsYoITNMMygiIiJiMVXIRERExBhVyAzTDIqIiIhYTBWyK5CWZn7M/PzCxxMn4Phx8%2BNnnbr6H6x6Pjc3qACc2bSNggJTQwPgW8lmftDwcNi2jQrtW8L27aaHT91n7u/YywuCq8ChM1XIyTE1NABpmaX/kOKyUiEPwoDErHr8fk9KU0UEZ5sb8IYbCh%2BDgqBSJXNjA4H%2BPqbHLFLF18v8oLm54OlpflxQhawMKCETERERY5SQGaYZFBEREbGYKmQiIiJijCpkhikhExEREWOUkBmmGRQRERGxmCpkIiIiYowqZIZpBkVEREQspgqZiIiIGKMKmWFKyERERMQYJWSGaQZFRERELKYKmYiIiBijCplhmkERERERi6lCJiIiIsaoQmaYEjIRERExRgmZYZpBEREREYupQiYiIiLGqEJmmGZQRERExGKqkImIiIgxqpAZpoRMREREjFFCZphmUERERMRiqpCJiIiIMaqQGaYZFBEREbGYKmQiIiJijCpkhikhExEREWOUkBmmGRQRERGxmCpkIiIiYowqZIZpBkVEREQspgqZiIiIGKMKmWHlPiFLTEzkhRdeYM%2BePXh5edGlSxcmTpyIp6cn77//PrNmzSInJ4f%2B/ftjt9vJz8/nxRdfBGDp0qUsW7aMw4cPU6tWLUaPHk3nzp0t3iMREZG/GCVkhpX7hGz06NH06tWLd955h6NHjzJgwAAaNGhAy5YtmTRpEq%2B88godO3ZkwYIFvP/%2B%2B0RFRQHw2WefMW/ePN58800aNWrEhg0biIuL47PPPuPGG28sdfy0tDTS09MvaA2katWgMtzLP%2Bfv7/poNrP/12y2Px4t%2BT8PDzc/ZqNGro8m8/IyN56np%2Buj2SpUMD%2Bmj4/ro%2Bk8bzA3nre366OIXJTN4XA4rB7EpWRlZeHl5YXX768WY8aMwcPDg7p16/L//t//Y8WKFQDk5%2BcTFRVFZGQkL774IsOGDSMkJISxY8c6tzV06FDatWvHsGHDSh1/7ty5zJs3z6Vt5MgYRo2KLYO9ExERKSO5uda9w/n007Lf5p13lv02y7FyXyH75ptvePXVV/nll1/Iy8sjLy%2BPbt26kZ6eTnBwsLOfu7s7TZo0cf68f/9%2BvvrqKxYvXuxsczgcNGjQ4LLi9%2B/f31l1K/L114H8979XuENXyN8foqJgwwaw282NDdCtm7nxbDa44QY4exaseMtQoX1L84M2agTvvguDBkFysunhD32yzdR4np4QFARpaYWvI2Y7ccL8mD4%2B0LAh7N0L2dnmxw/zNPnvytsb6tWD1FQ4d87c2AD165sfEwr/uK34o5ZrWrlOyFJSUnj88ccZN24c9957Lz4%2BPjz55JPk5eVRUFCAh4fr8N3OO7bl4%2BPDmDFjePDBBw2NISgoiKAg18OTX38Nx48b2uwVs9utiV1QYG68ol%2Blw2F%2BbAC2b7cg6O%2BSky2Jn5Njekig8HXLithnzpgfs0h2tkXxvc5aEJTCZOysRbHFHDqHzLByPYO7du3Cy8uL%2B%2B%2B/Hx8fHxwOB7t27QKgatWqHD582Nk3Pz%2Bfn376yflznTp12L17t8v2Dh8%2BTDk/QisiInLtcXMr%2B6/rTLne4%2BDgYLKzs9m1axcnT55k%2BvTpeHl5kZaWRkREBDt37mTjxo3k5OTw%2Buuvk33eMYD%2B/fuzZs0aNm7cSF5eHt988w09e/Zkx44dFu6RiIiImOHQoUMMGzaMiIgIOnXqxPTp0ym4yCGX9957j65duxIeHk7v3r1JSEhwLhs/fjxNmjQhLCzM%2BdWqVasyH2%2B5PmQZHh7Offfdx%2BDBg7nhhht47LHHmDBhAo899hjvvvsucXFxjB07Fk9PT4YOHUpERAS23y/Pa9euHePGjWPatGkcO3aMWrVqMWXKFFq0aGHxXomIiPzFlMOKVmxsLE2bNiUhIYHjx4/z6KOPUq1aNR544AGXfmvXruXll1/m3//%2BNzfffDMff/wxcXFxfPrpp9SuXRuAxx57jNjYq3sxX7lOyAAmTpzIxIkTXdq2bNkCQE5ODsOHD3e2Dx482CVrHTx4MIMHDzZnoCIiIlIuJCYmkpyczKJFi6hUqRKVKlUiOjqaxYsXF0vIsrOzeeKJJ7jlllsA6NevHzNmzOCHH35wJmRmKPcJ2cUcOHCAbt26MXfuXDp27MjXX3/N9u3beeKJJ6wemoiIyPXlKlTISroPaGBgYLEL7UqSlJREcHAwfn5%2BzramTZuSmppKVlYWvr6%2BzvbevXu7rJuZmcnp06epXr26s%2B2bb75h/fr1/Prrr9SvX58pU6bQrFmzK921El2zCVnt2rV58cUXmT59Ok888QTVq1fn6aefpmVLC25XICIicj27CglZfHx8sfuAxsTElOrQod1up3Llyi5tRclZRkaGS0J2PofDwcSJE2nevDl///vfgcJ8w83Njccff5yKFSsyb948HnzwQdauXUuVKlWuZNdKdM0mZAB33XUXd911l9XDEBERkTJW0n1AAwMDS73%2B5d5VITc3l/Hjx/Pzzz%2BzZMkSZ/vIkSNd%2Bj355JOsWrWKhIQE%2BvXrd1kxLuWaTshERESkHLgKFbKS7gNaWgEBAdgvuIu63W7HZrMREBBQrH92djYjRozg7NmzLFu27JKVL3d3d2rWrElaWtoVje1iyt9lESIiIiIGNGvWjCNHjnDivI/kSExMpEGDBlSsWNGlr8PhYPTo0Xh4ePD222%2B7JGMOh4MXXniB5PM%2BPSUnJ4f9%2B/eX%2BQn/SshERETEmHJ2Y9ii%2B4a9/PLLZGVlkZKSwqJFixg4cCAA3bp1Y%2BvWrQB88skn/Pzzz7zyyit4e3u7bMdms3Hw4EGmTp3K0aNHOX36NDNmzMDT05POnTsbGuOFdMhSREREjCmH9yGbM2cOkyZNol27dvj6%2BjJgwAAGDRoEQGpqKmd%2B//yyDz/8kEOHDjlP4i/Su3dvnn32WZ577jleeukl%2BvTpQ1ZWFjfffDOLFy%2BmQoUKZTpeJWQiIiLyl1OjRg0WLFhQ4rLzP1px8eLFl9yOv78/L7zwQpmOrSRKyERERMSYclghu9YoIRMRERFjlJAZphkUERERsZgqZCIiImKMKmSGaQZFRERELKYKmYiIiBijCplhSshERETEGCVkhmkGRURERCymCpmIiIgYowqZYZpBEREREYupQiYiIiLGqEJmmBIyERERMUYJmWGaQRERERGLqUImIiIixqhCZphmUERERMRiqpBdgb59zY/p7l742Lkz5OebH9/3bLq5AT08oEIVKpzLgLw8c2MDqfscpsf08oJg4NAn28jJMT089W6ymRswPBy2bSP4rpawfbu5sYF6M2eaHpOgIAi7j7Afl0FamvnxCwrMjRcUBI0awZYtluzvqQbhpsd0c4OKnnA6x9P06Qao5Gl%2BTEAVsjKghExERESMUUJmmGZQRERExGKqkImIiIgxqpAZphkUERERsZgqZCIiImKMKmSGKSETERERY5SQGaYZFBEREbGYKmQiIiJijCpkhmkGRURERCymCpmIiIgYowqZYUrIRERExBglZIZpBkVEREQspgqZiIiIGKMKmWGaQRERERGLqUImIiIixqhCZpgSMhERETFGCZlhmkERERERi6lCJiIiIsaoQmaYZlBERETEYqqQiYiIiDGqkBmmhExERESMUUJmmGZQRERExGKqkImIiIgxqpAZphkUERERsZgqZCIiImKMKmSGlbsZ3LJlC2FhYeTk5HDw4EFCQ0NJSUmxelgiIiJyMW5uZf91nSl3e9y6dWsSExPx8vKyeigiIiJyjTp06BDDhg0jIiKCTp06MX36dAoKCkrsu2TJErp27UrLli0ZOHAgO3fudC47d%2B4ckydPpkOHDkRERDBq1CgyMjLKfLzlLiETERGRa0w5rJDFxsZSvXp1EhISWLRoEQkJCSxevLhYvw0bNjB37lz%2B9a9/8fXXX9OpUyeGDx/OmTNnAJg1axZJSUnEx8ezdu1aHA4HTz31lOHxXcjShGz%2B/Pl06tSJ5s2b07VrV1asWMG3335LaGgo586dc/ZLTEykZ8%2BehIeHM3ToUI4ePQrA2bNnGTduHJGRkYSHhzNgwABnVjt37lyio6N57bXXiIiI4JZbbuGVV16xZD9FRETEPImJiSQnJzN27FgqVapE3bp1iY6OJj4%2Bvljf%2BPh4%2BvTpQ/PmzfHx8eHhhx8G4PPPPycvL48PPviAESNGULNmTfz9/YmLi2Pjxo3OXKSsWHZS/7Zt21iyZAnLly%2BnZs2afPXVV8TGxvLcc88V67t8%2BXLmz59PxYoVGTlyJJMmTWL%2B/PksXryYY8eOsW7dOry8vFiwYAGTJk3io48%2BAmDHjh2Eh4fz5ZdfkpiYyEMPPUTTpk3p3LlzqceZlpZGenq6S5uPTyCBgUHGJuAyFb1ZsO6wusl/Ku7uro8ms%2BKIuaen66PpwsPNjdeokeuj2YLM/R8GoEoV10ezXeRwzVUTEOD6aDIrni%2BtfK42%2B9fr4irscEmvv4GBgQSV4n83KSmJ4OBg/Pz8nG1NmzYlNTWVrKwsfH19Xfp2797d%2BbObmxuNGzcmMTGRxo0bc%2BrUKZo2bepcXr9%2BfXx8fEhKSqJ69epGdtGFZQnZqVOncHNzw8fHB5vNRvv27fn%2B%2B%2B/ZsmVLsb733XcfN954IwDR0dHExcWRl5dHZmYmnp6e%2BPj44OHhwYgRIxgxYoRzPTc3N0aOHImHhwe33HIL7du3Z%2BPGjZeVkMXHxzNv3jyXtpEjYxg1KvYK99yY8/6GTGbRC0jlypaEDbZod8GaPAGAbdusifvuu9bEtdJ5T/7XhR49LAlb0ZKohW64wfyYp06ZH7OIA1uZb7Ok19%2BYmBhiY//89ddut1P5gtePouQsIyPDJSGz2%2B0uiVtR34yMDOx2O0CxbVWuXLnMzyOzLCGLjIykSZMmREVFERkZSYcOHejdu3eJfevXr%2B/8vk6dOuTm5nL8%2BHEGDRrEQw89xG233catt95K586duf322136enj8sYs33ngjv/zyy2WNs3///kRFRbm0%2BfgEkpl5WZsxzM2tMBnLyrLmXVDl/LI/gfGS3N0Lk7HMTMjPNzc2cOiM%2BRmZp2dhMpaWBrm5pocn%2BK6W5gZs1KgwGRs0CJKTzY0NMGaM%2BTGrVClMxtasgatwUvCfsqJC1qMHrF4NJ06YGxs43WeI6THd3AqTsbNnLa5Y/QWU9PobGBhY6vUdDkeZ9b2cbV0pyxIyLy8v3njjDZKTk1m/fj3Lli1j4cKFjBs3rlhft/NKoUWT4u3tTfXq1VmzZg3ffvstGzZsYPLkyaxcuZI5c%2BYAkH/BC7nD4cBmu7wsPigoqFh5NCPDkhwBKPwHtyR2Xp4FQSncWQti5%2BSYHtIpN9ei%2BNu3WxCUwmTMithpaebHLJKRYU18qzKEEycs2V8rE6KCgusrIbsa%2B1rS629pBQQEOKtbRex2OzabjYALDqFXqVKlxL4NGzZ09rXb7VSs%2BEfN9eTJk1StWvWKxnYxlp2RlJubS1ZWFo0aNWLkyJF8/PHH2Gy2YkkUQGpqqvP7AwcO4OPjg7%2B/P6dPnyY/P5%2B2bdsyceJE3n//fdauXessIx45coS8817MDx8%2BXKbHe0VEROSPBLQsv4xo1qwZR44c4cR5ldnExEQaNGjgklgV9U1KSnL%2BnJ%2Bfz08//UTz5s2pXbs2fn5%2BLsv37NlDTk4OzZo1MzbIC1iWkC1cuJBHHnmE3377DYCUlBROnjzJkSNHivVdtmwZ6enpnDp1isWLFzvPARs1ahQvvfQSWVlZFBQUsH37dvz9/Z3HgvPy8njzzTfJyclh69atfPXVV8XKnyIiIvLX0qRJE8LCwnj55ZfJysoiJSWFRYsWMXDgQAC6devG1q1bARg4cCAff/wxP/zwA2fPnuX111/Hy8uLjh074u7uzr333ssbb7zBkSNHyMjIYObMmXTp0oVq1aqV6ZgtO2T5wAMPcPjwYe6%2B%2B26ys7OpWbMmY8eOpU6dOsX6DhgwgKFDh3LkyBFatmzJhAkTAHjmmWecN2uz2Ww0bNiQV1991XmIs2HDhuTl5XHrrbeSl5fHQw89RMeOHc3cTRERkb%2B88nh4ds6cOUyaNIl27drh6%2BvLgAEDGDRoEFB45K3oPmMdOnTgiSeeIC4ujuPHjxMWFsb8%2BfPx8fEBCos/p0%2Bfpnfv3uTl5dGpUyemTJlS5uO1Ocw4U80Cc%2BfO5csvv2T58uVlvm0rzsW1%2BBx3quSl/3mnsuThUXgCdEaGJeeQpWaV/sTRsuLlBcHBcOiQNeeQ1bup7K%2BSuqTw8MIrO1u2tOYcspkzzY8ZFAT33QfLll0f55AFBcGQIfDOO5bs76lh5l%2B44eYGFSvC6dPWJCmVKpkfE%2BC8W4eWGW/vst9meaYPFxcRERFDymOF7FqjhExEREQMUUJm3F/2syxjY2OvyuFKERERkbKmCpmIiIgYogqZcX/ZCpmIiIjItUIVMhERETFEFTLjlJCJiIiIIUrIjNMhSxERERGLqUImIiIihqhCZpwqZCIiIiIWU4VMREREDFGFzDglZCIiImKIEjLjdMhSRERExGKqkImIiIghqpAZpwqZiIiIiMVUIRMRERFDVCEzTgmZiIiIGKKEzDgdshQRERGxmCpkIiIiYogqZMapQiYiIiJiMVXIRERExBBVyIxTQiYiIiKGKCEzTgnZFahQwfyYNlvho48POBzmx2ffMXPj%2BfhAlSpgt0N2trmxgbTMQNNjVqgAwcFw4gScOWN6eOrNnGluwKCgwscxYyAtzdzYAE88YX7M8HC47z54%2BWXYvt38%2BG%2B8YW68oifLChXA19fc2EAlXyueLAFsVKxgXWy5NikhExEREUNUITNOJ/WLiIiIWEwVMhERETFEFTLjlJCJiIiIIUrIjNMhSxERERGLqUImIiIihqhCZpwqZCIiIiIWU4VMREREDFGFzDglZCIiImKIEjLjdMhSRERExGKqkImIiIghqpAZpwqZiIiIiMVUIRMRERFDVCEzTgmZiIiIGKKEzDgdshQRERGxmCpkIiIiYogqZMYpIRMRERFDlJAZp0OWIiIiIhZThUxEREQMUYXMOFXIRERE5Lpit9uJi4ujbdu2tG/fnn/%2B859kZ2dftP9nn31Gr169CA8Pp2vXrixfvty5bO7cuTRu3JiwsDCXr2PHjl3WmFQhExEREUOutQrZpEmTyMnJYdWqVeTm5vL4448zY8YMJk6cWKzvjz/%2ByNixY5k5cyYdO3bkq6%2B%2BYuTIkdx00020atUKgN69e/Piiy8aGpMqZCIiImJIQUHZf10tx44dIyEhgdGjRxMQEED16tUZMWIEH374Ibm5ucX62%2B12Hn30UTp37oyHhwe33XYbISEhbN26tUzHpQqZiIiIlDtpaWmkp6e7tAUGBhIUFGRou7t27cLd3Z3Q0FBnW9OmTTlz5gz79u1zaQfo0KEDHTp0cP6cl5dHeno61atXd7bt3r2bAQMGsGfPHmrWrMlTTz1F%2B/btL2tcSshERETEkKtR0YqPj2fevHkubTExMcTGxhrart1ux9fXF5vN5mzz8/MDICMj40/XnzFjBhUqVKB79%2B4A1KhRg9q1azNmzBiCgoKIj49n%2BPDhrFy5kptuuqnU41JCJiIiIuVO//79iYqKcmkLDAws1borVqzgH//4R4nLRo8ejcPhuOzxOBwOZsyYwapVq1iyZAne3t4A9OvXj379%2Bjn7RUdHs3r1alauXElcXFypt/%2BXTsiGDBlC8%2BbNGTt2rNVDERER%2Bcu6GhWyoKCgKz482bt3b3r37l3isq%2B%2B%2BoqsrCzy8/Nxd3cHCqtmAFWrVi1xnYKCAp566il%2B/PFH3nvvPWrXrn3J%2BMHBwaSlpV3WmHVSv4iIiBhyLZ3U37hxYxwOB8nJyc62xMREKleuTL169Upc5/nnn2fv3r0lJmOvvfYamzdvdmlLSUn506TtQkrIRERE5LoREBBA165dmT17NidOnOC3337j1VdfpW/fvnh4FB44HDp0KGvWrAHg%2B%2B%2B/Z%2BXKlcyfPx9/f/9i27Pb7UydOpV9%2B/Zx7tw5Fi5cyP79%2B7nnnnsua1ymJ2QHDx4kNDSUtWvX0qNHD26%2B%2BWYGDx7svJJi5cqVdO/enfDwcKKionj33Xed686dO5dHH32UuLg4WrZsCcDZs2eZNGkSERERtGnTxnlvkSL5%2BflMnjyZli1bEhkZ6ZxgERERKRvXUoUMYNq0aVSqVInbb7%2BdXr16cfPNNzN69Gjn8gMHDnDy5EkAPvzwQ06dOkWnTp1cbvz64IMPAjBmzBg6dOhAdHQ0rVu3ZtWqVbz99tvUqFHjssZk2TlkS5cuZeHChfj4%2BBATE8OUKVMYP34848aN46233iIyMpJvvvmGBx98kJYtW9KoUSMAfvjhBx5//HFefvllAGbOnMnPP//Mp59%2BCsDDDz/Mq6%2B%2B6pzYVatW8fzzzzNx4kTmzZvHlClTuOOOO5xZ8J8p6bJbPz/jl91erqKLQc67KMRcPj7mxvPycn00WYU882MWTbHZU%2B1k8t80Vaq4PpotPNz8mL8/jzkfzVatmrnxiqoJJVQVRKxUqVIlZs6cedHlGzZscH7//PPP8/zzz1%2B0r7e3NxMmTGDChAmGxmRZQjZo0CDnPTyio6OJi4tjzpw5fPPNN87LTyMjI6latSpJSUnOhMzd3Z2BAwdis9lwOBx8/PHHPP/88wQEBACFE5eZmemM07JlS2699VYAunXrxr///W9OnDhR6oSqpMtuR46MYdQoY5fdXilPT0vCwkWOq191wcGWhA2zJGqhhg0tChx2nzVxf7903HT3WbS/AOdV/q8Lt99u9QjMZ8W75yu4crCsXGt36i%2BPLEvIzj9xLjg4mJycHE6ePMny5cv54IMPSEtLw%2BFwkJOT43IIskaNGs57h2RkZJCZmUmtWrWcyxtd8M7z/GVFl6iev70/U9Jlt35%2BgVzGJsqEzVaYjOXmWvM/53Uo1eSAXoXJ2KFDmD7ZQGKW%2BQmoj09hMrZ3L1ziI9WumrAfl5kbsEqVwmRszRooxb1/ytzvVXZTNWpUmIwNGgTnnVBsmn/%2B09x4/v6Fydj69fD7VWym6tPH/JhQ%2BIRtYXJkBSVkxlmWkBWc99sruh/IBx98wPz583nttddo3bo17u7u3HbbbS7rnX%2Bo0c3Nrdi2LmQz%2BC6lpMtuz52z7n/N4bAothUZAhQmYxbEPnPG9JBO2dkWxb/MS7TLTEaGNbG3bzc/ZpHkZGviX%2BaHHZcZu9262CLXCMuusty/f7/z%2B0OHDuHj48PBgwdp1aoVbdq0wd3dnfT09Evex8Pf35/KlSuTmvpH9SYpKYkVK1Zc1bGLiKGngAAAACAASURBVIjIH661k/rLI8sSsvfee49jx45ht9tZvHgxt912G8HBwezbt4%2BTJ09y6NAhnn32WW688UaOHj160e306dOHN998k6NHj5KRkcEzzzzD3r17TdwTEREREWMsO2TZq1cvhg4dyv79%2B2nRogVPP/00np6efPfdd87kbMqUKezcuZPZs2df9OMSxowZw7PPPkv37t3x8vKic%2BfOxMTEmLw3IiIi16/rsaJV1ixLyFq0aMHq1auLtb/11lsuP7du3ZoHHnjA%2BfOFHyrq5eXFtGnTmDZtWrFtvfPOOy4/169fn927dxsZtoiIiFxACZlxulO/iIiIiMX%2B0h8uLiIiIlefKmTGmZ6Q1apVS4cNRURERM6jCpmIiIgYogqZcUrIRERExBAlZMbppH4RERERi6lCJiIiIoaoQmacKmQiIiIiFlOFTERERAxRhcw4JWQiIiJiiBIy43TIUkRERMRiqpCJiIiIIaqQGacKmYiIiIjFVCETERERQ1QhM04JmYiIiBiihMw4HbIUERERsZgqZCIiImKIKmTGqUImIiIiYjFVyERERMQQVciMU0ImIiIihighM06HLEVEREQspgqZiIiIGKIKmXFKyERERMQQJWTGKSG7AvfcY37M%2BvVh7lwYMwZSUsyPv2aEyUErV4Z69eDAAcjMNDc2EBGcbXpMPG8AGhHmmQxeZ82Pb/YzalG8ggJrns3feMP8mNWqFT7%2B859w7Nj/b%2B/e46Kq1v%2BBfwYEBkFUPKBy8fo1MK8Qat4VNEhQ0lBQIzWtr6GI0NGOmYW3yrspmsf8mnhCD15ITC0D08PBNEUx8H5ET4ICgwYiyHWY3x8c5%2Bcc1KA9M2uY%2BbxfL14wa%2B/Z69kybJ951pq19d//zJn67c/DA3j9dWD5ciA9Xb99A8Cbb%2Bq/T5kMkMuBigpApdJ//9bW%2Bu%2BTtIIJGREREUnCCpl0nNRPREREJBgrZERERCQJK2TSMSEjIiIiSZiQScchSyIiIiLBWCEjIiIiSVghk44VMiIiIiLBWCEjIiIiSVghk44JGREREUnChEw6DlkSERERCcaEjIiIiCR5fAc0bX7pUlFREebOnYsBAwZg0KBBWLhwIcrLn37LvISEBLi7u6NHjx4aXxkZGf859xqsW7cOPj4%2B6NOnD6ZPn47s7OwGx8SEjIiIiEzKokWLUFZWhkOHDmH//v3IysrC6tWrn7l/nz59kJmZqfHVs2dPAEBcXBy%2B/fZbbN26FcePH0eHDh0wa9YsqBp4L1MmZERERCRJY6qQ3bt3D8nJyYiMjIS9vT1at26NsLAw7N%2B/H1VVVQ0%2BXnx8PKZOnYrOnTvD1tYWkZGRyMrKwi%2B//NKg4zAhIyIiIkkaU0J25coVmJubw83NTd3WrVs3PHr0CDdv3nzqc3JzczFt2jT06dMHPj4%2BSExMBACUl5fjxo0bePHFF9X72traon379sjMzGxQXPyUJRERERkchUKBgoICjTYHBwc4OjpKOm5RURFsbW0hk8nUbc2bNwcAFBYW1tnf3t4eHTp0QFRUFP7nf/4HSUlJmD9/PhwdHdGpUyeoVCr185883tOO9TxMyIiIiEgSXVS04uPjERMTo9E2e/ZshIeH/%2B5zExMTMX/%2B/Kdui4yMbND8rmHDhmHYsGHqx/7%2B/khKSkJCQgL%2B/Oc/A0CD54s9DRMyIiIiMjjBwcHw9vbWaHNwcKjXcwMDAxEYGPjUbSdPnkRJSQmUSiXMzc0B1FbNAKBVq1b1Or6zszMuXryIFi1awMzMTP38x4qKiup9rMeYkBEREZEkuqiQOTo6Sh6efJquXbtCpVLh6tWr6NatGwAgMzMTdnZ26NixY539d%2B/ejebNm2PUqFHqtqysLLi6usLKygpdunTBpUuX0LdvXwBAcXExbt%2B%2Brf4UZn1xUj8RERFJ0pgm9dvb28PX1xfr16/Hb7/9hry8PGzatAlBQUFo0qS2TjVlyhQcOXIEAFBZWYmlS5ciMzMTVVVVOHToEFJSUhASEgIAmDhxInbu3ImsrCyUlJRg9erV6Nq1K3r06NGguFghIyIiIpOyZMkSfPzxx/Dx8YGFhQUCAgIQGRmp3p6dnY0HDx4AAN58802UlpYiIiICBQUFcHFxwaZNm9C9e3cAQEhICAoKChAaGorS0lL069evzty3%2BmBCRkRERJI0tntZNmvWDGvXrn3m9h9//FH9s0wmQ1hYGMLCwp66r0wmw5w5czBnzhxJMXHIkoiIiEgwVsiIiIhIksZWITNETMiIiIhIEiZk0nHIkoiIiEgwg07ITp8%2BjSFDhmis/UFERESGpTEte2GoDDohi42NRe/evXHo0CHRoRARERHpjEHPISspKUGvXr1gZmbQeSMREZFJM8WKlrYZbKbzxhtv4OzZs9i%2BfTt8fX2RmpqKcePGwcPDA4MHD8aGDRvU%2ByYkJCAgIACfffYZevfujfz8fNTU1GDDhg0YMWIEevXqhddffx3nzp0TeEZERETGiUOW0hlshezrr79GaGgoevXqhbCwMAwcOBAffPABgoKCcP36dYSEhKB79%2B7qG48qFApYWVnh7NmzsLCwwFdffYXDhw9j27ZtcHJyQnx8PN59912cOHECTZs2rXccCoUCBQUFGm329g5o2VL799d6HhcXze96Z2en3/5sbTW/65u1tf77tLLS/K5vOrhn3HPZ22t%2B17cGXAe0pkULze/65uGh3/7c3TW/65tMJq5PEX2rVPrvk7TGYBOyJzVt2hQpKSmwsbGBTCaDm5sb3NzccPHiRXVC9vDhQ7z99tuwsLAAAOzbtw9Tp05Fhw4dAAChoaGIjY3FiRMnGvQhgfj4%2BDq3QAgLm42IiHDtnFwDvf%2B%2BkG4BDBHTraenmH5FesrNbfVC1H%2Ba/v5i%2BhXJx0dMv6%2B/LqbfXbvE9CuSiDdWZWX67/M/TLGipW2NIiEDgO%2B%2B%2Bw47duzAnTt3UFNTg6qqKnh5eam329nZwfaJasrt27exfPlyfPLJJ%2Bq2mpoa5ObmNqjf4OBgddL32KefOiBcz/mYi0ttMrZiBZCTo9%2B%2BAWDj%2BBT9dmhrW5uMnT8PlJTot29A/9UioPYC3rEjcOsWUFGh//7PntVvf/b2tcnY4cPAb7/pt29AXIXMxwc4dgwoKtJ//8uX67c/d/faZGzSJODqVf32DQA//aT/PmWy2r/ligpWrKhBGkVCdurUKURHR2P16tUYOXIkLCwsMGnSJI19Ht%2Bh/TG5XI5ly5bB19dXUt%2BOjo5w/K//nH/7Tcz/H0BtMpaVJaDj4mIBnaI2GRPRd7Nm%2Bu/zsYoKMe90FQr99wnU/jGJ6FvUcDhQm4zdu6f/ftPT9d8nUJuMiehbZEKkUplUQsYKmXQGO6n/SRkZGejYsSNGjRoFCwsLVFRUIOt3shJXV1dcu3ZNoy1HRGmJiIjIyHFSv3SNIiFzdnZGXl4ecnNzce/ePURHR8PR0RH5%2BfnPfE5ISAji4uJw4cIFKJVKHDlyBAEBAbh7964eIyciIiL6fY1iyNLX1xfHjh3DqFGjYG9vj/nz52Pw4MFYuHAhVq1ahc6dO9d5TlBQEHJzczF79myUlJSgU6dOiImJgZOTk4AzICIiMl6mWNHSNoNOyP72t7%2Bpf163bl2d7U9%2BWnLcuHEa28zMzBAREYGIiAjdBUhERESkBQadkBEREZHhY4VMOiZkREREJAkTMukaxaR%2BIiIiImPGChkRERFJwgqZdKyQEREREQnGChkRERFJwgqZdEzIiIiISBImZNJxyJKIiIhIMFbIiIiISBJWyKRjQkZERESSMCGTjkOWRERERIKxQkZERESSsEImHStkRERERIKxQkZERESSsEImHRMyIiIikoQJmXQcsiQiIiISjBUyIiIikoQVMulYISMiIiISjBUyIiIikoQVMumYkBEREZEkTMik45AlERERkWCskBEREZEkrJBJJ1OpVCrRQTQ2ZWX671MmA%2BRyoLwcEPEbKyl5qNf%2BmjQxQ8uWNigsLEV1tf7/0h1ayPXeJwDAwgKoqhLS9cNyC732Z2YG2NgApaViLubNbAVd%2BmQyMX/EQO0FRJ9EX7iaNtV/nx4ewPnzgKcnkJ6u//4Fvbb8/bV/zMOHtX9MQ8YKGREREUnCCpl0TMiIiIhIEiZk0nFSPxEREZFgrJARERGRJI2tQlZUVITo6GicOXMGZmZmGDp0KBYtWgS5vO784Q8//BCJiYkabUqlEoGBgfj000/xl7/8BQcPHoS5ubl6u5WVFdLS0hoUEytkREREZFIWLVqEsrIyHDp0CPv370dWVhZWr1791H2XLVuGzMxM9Vd6ejo6deoEPz8/9T7vvvuuxj4NTcYAJmREREQkUU2N9r905d69e0hOTkZkZCTs7e3RunVrhIWFYf/%2B/aiqx6fcY2Nj4eTkhKFDh2o1Lg5ZEhERkSS6SKAUCgUKCgo02hwcHODo6CjpuFeuXIG5uTnc3NzUbd26dcOjR49w8%2BZNjfb/VlxcjC1btmDXrl0a7adPn8axY8fw66%2B/onPnzoiOjkb37t0bFBcTMiIiIjI48fHxiImJ0WibPXs2wsPDJR23qKgItra2kMlk6rbmzZsDAAoLC5/73K%2B//hp9%2BvRBly5d1G2urq4wMzNDREQEbGxsEBMTg7feegtHjx5Fy5Yt6x0XEzIiIiKSRBcVsuDgYHh7e2u0OTg41Ou5iYmJmD9//lO3RUZG4o%2Bsia9UKhEXF4c1a9ZotM%2BaNUvj8bx583Do0CEkJydj/Pjx9T4%2BEzIiIiIyOI6Ojn94eDIwMBCBgYFP3Xby5EmUlJRAqVSqPxlZVFQEAGjVqtUzj3n27FlUVlbCy8vruX2bm5ujbdu2UCgUDYqZk/qJiIhIksY0qb9r165QqVS4evWqui0zMxN2dnbo2LHjM5937NgxvPzyy2jS5P/XslQqFT799FONY1VWVuL27dtwdXVtUFxMyIiIiEiSxpSQ2dvbw9fXF%2BvXr8dvv/2GvLw8bNq0CUFBQepka8qUKThy5IjG865cuQIXFxeNNplMhpycHCxevBj5%2BfkoLS3F6tWrYWFhgREjRjQoLiZkREREZFKWLFmCZs2awcfHB2PGjEHPnj0RGRmp3p6dnY0HDx5oPKegoAB/%2BtOf6hxr%2BfLl6NChA8aNG4cBAwbgypUriI2NRdMG3txepvojM9tMXFmZ/vuUyQC5HCgvB0T8xkpKHuq1vyZNzNCypQ0KC0tRXa3/JaAdWtRdrVkvLCyAeqyDowsPyy302p%2BZGWBjA5SWilnlu5mtoEufTCbmjxiovYDok%2BgLVwP/Q9QKDw/g/HnA0xNIT9d//4JeW/37a/%2BYp05p/5iGjBUyIiIiIsH4KUsiIiKSpLHdy9IQMSEjIiIiSZiQScchSyIiIiLBWCEjIiIiSVghk44VMiIiIiLBWCEjIiIiSVghk44JGREREUnChEw6DlkSERERCcYKGREREUnCCpl0rJARERERCWYQCVlOTg7c3NyQlZWlleMNHDgQCQkJWjkWERERPV9Njfa/TA2HLImIiEgSU0ygtM0gKmREREREpsygErLMzEwEBATAw8MDU6ZMQX5%2BPgAgLS0NEyZMgIeHBwYNGoR169ah5j/peHV1NZYuXYp%2B/fph8ODB2Lt3r/p4mzZtwrhx4zT6SEtLQ8%2BePVFSUqK/EyMiIjJiHLKUzqCGLPfs2YOtW7fCxsYGs2bNwqJFi/DJJ59g%2BvTpmD9/PsaPH48bN27g7bffhqOjIyZPnoz9%2B/fj%2B%2B%2B/x65du9C2bVusWLECDx48AAAEBgZi48aNyMrKQufOnQEAR48exfDhw2Fra1uvmBQKBQoKCjTa7Owc4ODgqN2T/x0ymeZ3fWvSRL%2B5u7m5mcZ30j0zPf9TP%2B5P3/2aNH1fQERfuDw89N%2Bnu7vmd31KT9d/n/9higmUthlUQjZ58mQ4OTkBAKZOnYq5c%2BciMTERTk5OmDx5MgDgxRdfRGBgIL777jtMnjwZSUlJGD16tDrhioiIQHx8PADAxcUFXl5e%2BPbbbzF37lwAQHJyMhYuXFjvmOLj4xETE6PRNmvWbMyZEy75fP8IKysh3UIutxHSr52dtZB%2BhbKwENKtjZhuYS3sVywoSQDEJShyuZh%2BRV24zp8X0y8A7Nql/z5Fva5IKwwqIXucVAFAu3btUFVVhVu3bmm0A0D79u3x3XffAQDy8/MxbNgw9TZ7e3s0b95c/TgwMBB//etfMXfuXGRmZqK0tBRDhgypd0zBwcHw9vbWaLOzc0B5eUPOTDqZrPaaVlEBqFT67RsAyspK9dqfubkZ7OysUVxcBqVS/2%2B9Wtpa6r1PALXJWFWVkK5LK/WbkZmZ1SZjZWVi3l3bNBXwhwTU/jGL%2BCMGai8g%2BiT6wjVggP77dHevTcYmTQKuXtV//4KwQiadQSVkZk%2BMXaj%2B88cre0bG/7i9srIS1dXVGttqnnhlvPrqq1i2bBkuXLiA48ePw8/PD5aW9f/P1tHREY6OmsOTZWXirqcqlZi%2Bq6vF/LUplTXC%2BjY1oi6opjpfRAhTu3AJHMLD1ati%2B6dGx6Bmb9y6dUv9c3Z2NuRyOdq3b4%2BbN29q7Hfz5k24uroCqE2Y8vLy1NsUCgWKi4vVj21tbeHj44Pvv/8e3333HcaMGaPjsyAiIjItnNQvnUElZHFxcSgoKMDDhw8RGxuLESNG4NVXX0V2djbi4%2BNRXV2NjIwMfPPNNxg7diwAYPDgwTh06BD%2B/e9/o6SkBOvWrYPVf81XCAwMxN69e1FVVYWXXnpJxKkREREZLSZk0hnUkGVISAimTJmC3NxceHp64oMPPkCrVq0QExODzz//HJ999hkcHR0RERGB1157DUDt5P/s7GxMmDABlpaWmDNnDs6dO6dx3EGDBsHa2hoBAQHPHAIlIiIiEkWmUomaVKA/JSUlGDp0KBISEtC%2BfXvJxysr00JQDSST1X5AqrxczFSMkpKHeu2vSRMztGxpg8LCUiFzyBxaCPo0msBJ/Q/L9T%2Bp38YGKC0V8264ma0JTuoX8WkkkReupk3136eHR%2B2nOz09xcwhE/Ta%2Bs8sIq3Kztb%2BMQ2ZQQ1Z6kJFRQWWLFmCQYMGaSUZIyIiItI2o07I0tLS0KdPH9y/fx8ff/yx6HCIiIiMEueQSWdQc8i0zcvLCxkZGaLDICIiMmqmmEBpm1FXyIiIiIgaA6OukBEREZHusUImHStkRERERIKxQkZERESSsEImHRMyIiIikoQJmXQcsiQiIiISjBUyIiIikoQVMulYISMiIiISjBUyIiIikoQVMumYkBEREZEkTMik45AlERERkWCskBEREZEkrJBJxwoZERERkWCskBEREZEkrJBJx4SMiIiIJGFCJh2HLImIiIgEY0JGREREktTUaP9L1zIzMzFy5EhMmDDhd/fduXMnfH194enpiYkTJ%2BLixYvqbRUVFfjoo48wZMgQ9OvXD3PmzEFhYWGD42FCRkRERCbl4MGDCA8PR/v27X933x9//BEbN27EypUr8dNPP2H48OGYOXMmHj16BABYt24dLl26hPj4eBw9ehQqlQoLFixocExMyIiIiEiSxlYhq6ioQHx8PHr16vW7%2B8bHx2PcuHHo1asX5HI5ZsyYAQA4fvw4qqursW/fPoSFhaFt27Zo0aIF5s6dixMnTiA/P79BMXFSPxEREUmiiwRKoVCgoKBAo83BwQGOjo6Sjz1%2B/Ph673vp0iWMGjVK/djMzAxdu3ZFZmYmunbtiocPH6Jbt27q7Z07d4ZcLselS5fQunXrevfDhOwPsLbWf58KhQJffhmP4OBgrbwYG8rauple%2B1MoFNi4cbuw8xVBoVAgPl7c77iZhX77UygU2L5d3PkCMr33KPp3rO%2BLl0KhQPyXX4o7X5VK710qFArEb9yI4O%2B/N5lrF6Cbf%2BqNG%2BMRExOj0TZ79myEh4drv7PnKCoqQvPmzTXamjdvjsLCQhQVFQEA7OzsNLbb2dk1eB4ZhywbiYKCAsTExNR5t2CsTO18AdM7Z1M7X8D0ztnUzhcwzXPWleDgYCQkJGh8BQcH1%2Bu5iYmJcHNze%2BpXQkJCg2NR/U7G%2BXvb64MVMiIiIjI4jo6Of7jKGBgYiMDAQK3E0bJlS3Ul7LGioiJ06dIF9vb26sc2Njbq7Q8ePECrVq0a1A8rZERERETP0L17d1y6dEn9WKlU4vLly%2BjVqxdcXV3RvHlzje3Xr19HZWUlunfv3qB%2BmJARERERPcHPzw9paWkAgIkTJ%2BLAgQO4cOECysrK8MUXX8DS0hLDhg2Dubk5JkyYgC1btiA3NxeFhYVYu3YtRo4ciT/96U8N6pNDlo2Eg4MDZs%2BeDQcHB9Gh6IWpnS9geudsaucLmN45m9r5AqZ5zo2Rr68v7t69C6VSiZqaGvTo0QMA8P3338PZ2Rm3bt1SrzM2ZMgQREVFYe7cubh//z569OiBrVu3Qi6XAwDmzJmD0tJSBAYGorq6GsOHD0d0dHSDY5KptDETjYiIiIj%2BMA5ZEhEREQnGhIyIiIhIMCZkRERERIIxISMiIiISjAkZERERkWBMyIiIiIgEY0JGREREJBgTMiIiIiLBmJARERERCcaEjIiIiEgw3suShLp7926993VyctJhJES6U1NTg99%2B%2Bw2VlZV1tvF13fiVlpbCxsZGdBjUyPFelgasqKgIW7ZswV/%2B8hcAQFxcHOLj49G%2BfXssWrQIjo6OgiOUzt3dHTKZrF77XrlyRcfR6F9eXh4OHTqEvLw8fPjhhwCAjIwM9OzZU3BkuvPjjz/ixIkTUCgUAIA2bdrA29sbQ4YMERyZbhw5cgSLFy9GcXGxRrtKpYJMJjPK13V5eTmOHz%2BOvLw8TJs2DUDta71NmzaCI9ONXr16wdvbG2PGjMHgwYPRpAlrHdRwTMgMWHh4OJRKJTZv3ozMzEyEhoYiOjoaFy9ehEKhwIYNG0SHKNnNmzfVP2dkZGD//v0IDQ1Fhw4dUFNTgxs3bmDXrl2YOnUqXnnlFYGRat%2BxY8cQGRkJT09PnDt3DpmZmcjNzUVAQACWLFkCf39/0SFq3YYNG/DVV19h0KBBcHJygkqlwt27d3Hy5EnMmDEDs2bNEh2i1g0cOBBBQUHw8/ODlZVVne2dOnUSEJXunD9/Hu%2B%2B%2By7s7OyQm5uLixcv4s6dOwgICMDmzZvRv39/0SFqXVpaGn744QckJyejtLQUfn5%2BGDNmDF566SXRoVFjoiKD1bdvX1VxcbFKpVKpPvnkE9V7772nUqlUqrKyMlX//v1FhqYTAQEBqvz8/DrtOTk5Kn9/fwER6VZAQIAqKSlJpVKpVD169FC3nzp1yijPV6VSqby8vFTnzp2r03727FmVl5eXgIh0z9PTU1VVVSU6DL0JCgpSff311yqVSvN1ffjwYdW4ceNEhaU3GRkZqrVr16peeeUV1fDhw1Vr165V3b59W3RY1AhwUr8Bq6mpga2tLQDg5MmT8PHxAQBYWFigrKxMZGg6cefOHTRt2rROe/PmzXHnzh0BEelWdnY2vL29AUBj2LZPnz7IyckRFZZOmZubo0ePHnXae/XqBXNzcwER6V5AQADOnDkjOgy9%2Bde//oXg4GAAmq9rPz8/jYq4serRowd8fHzg7e2N4uJi7N%2B/H%2BPGjUNUVBQKCwtFh0cGjAPdBqx79%2B7YtGkTrKysoFAoMGzYMAC1c1I6duwoNjgd8PT0RFhYGKZPnw5nZ2dUV1cjLy8PO3fuhIeHh%2BjwtM7JyQnXrl1D165dNdpTU1PRqlUrQVHp1pQpU/DXv/4VYWFhMDOrfT9YU1ODr776CqGhoYKj0561a9eqf27atCkWLFgAT09PuLi41JkzGRUVpe/wdMrBwQG5ublwdXXVaM/MzFS/wTRGt27dwrfffotDhw6hoKAA3t7eWLt2LQYNGoRHjx5hyZIlmD9/Pr788kvRoZKBYkJmwD7%2B%2BGMsXboUxcXFWLVqFaytrVFUVIRly5YZxfyx/7Zy5UosX74cERERKC8vBwA0adIE/fv3x/LlywVHp32TJk3C9OnTERQUBKVSiR07duDatWs4cuQI5s%2BfLzo8nThz5gx%2B%2BeUXxMbGwtXVFTU1NcjNzUVVVRVeeOEF/POf/1Tv%2B/e//11gpNKkp6drPG7Xrh3u3buHe/fuabTX9wMtjcno0aPx9ttvY9q0aaipqUFycjKuXr2KuLg4TJo0SXR4OjFu3DhcvXoVL730Et555x34%2BflpJJ%2B2trZYunQp%2BvbtKzBKMnSc1N8IVVRUPHVysDEpKipCZWUl7O3tjfoTSz/88AP279%2BP27dvQy6Xw9XVFSEhIRgwYIDo0HQiJiam3vvOnj1bh5GQrqhUKuzYseOpr%2BugoCCjTEI3b96MwMBAODs7P3e/c%2BfOcaI/PRMTMgOWnZ2NVatWqathK1euVC97sWrVKnTu3FlwhNr3eBmI/Px8LFy4EIDxLwNh6h48eIDmzZuLDkNnqqqqsGnTJgwaNAheXl4AgIMHD%2BLGjRuYPXs2LC0tBUeoXQUFBXBwcBAdhs4dOHCg3vu%2B9tprOoyEjAUTMgP21ltvwdXVFYsXL8bp06cRHh6OzZs348KFCzh9%2BjT%2B7//%2BT3SIWmVqy0AsWLDgmdvMzMzQunVrDBkyBL1799ZjVLp16dIlLFq0CAkJCQCAiIgIHD16FC1btsTmzZuNcq7gRx99hIsXL%2BKzzz7DCy%2B8AAC4fPkylixZAjc3NyxevFhwhNrl4eGBc%2BfOqecIGqtBgwZpPC4uLkZVVRXs7OygUqlQXFwMuVyO1q1b4%2BjRo4KipMaECZkB8/LyQmpqKuRyOT7%2B%2BGOoVCosWbIEVVVVGDRoEH7%2B%2BWfRIWrV6NGjERERgREjRqBnz57IyMgAAJw%2BfRrLli3DoUOHBEeoXR9%2B%2BCGSkpJgbW2NF198EWZmZrh8%2BTIqKirQt29f3Lt3D%2Bnp6YiOjkZQUJDocLVi4sSJGDx4SXnIvQAADwBJREFUMMLCwpCcnIzo6Gjs2bMH58%2Bfx65du7Br1y7RIWrdgAEDcPjwYbRs2VKjvbCwEAEBATh58qSgyHRjxYoVkMvlmDFjhsmsXr93715cunQJERER6t%2BzQqHA%2BvXr4eHhgfHjxwuOkBoD452cYwTMzc3VSwGkpqaqV3JXqVSoqqoSGZpOmNoyEC1atEBoaGidTxx%2B8cUXsLCwwDvvvIPU1FQsW7bMaBKy69ev429/%2BxuA2oroqFGj4OTkhLZt2xpdpegxpVL51HlTVVVVqKioEBCRbqWmpkKhUGDr1q2ws7Ors5xJamqqoMh0JyYmBkePHoVcLle3OTo64oMPPsCoUaOYkFG9MCEzYH369MHixYthYWGByspKdYl8x44dcHd3Fxyd9pnaMhB79uxBamqqxtCOmZkZ3n77bQwfPhzvvPMOBg4ciPz8fIFRapeVlRWqqqogk8nwz3/%2BE6tWrQIAPHr0CDU1NYKj041XXnkFs2bNwltvvQVnZ2eoVCrcunUL27ZtM7pheKB2qoWpKS8vR25ubp3liO7fv2%2BUSTfpBhMyA7Z48WJ8/vnnKCwsVFdNHjx4gG%2B%2B%2BQbr168XHZ7WmdoyEBYWFkhJScGIESM02k%2BdOqW%2BCfWJEyfQtm1bEeHpxJAhQzBnzhw0adIEtra2ePnll1FVVYV169bB09NTdHg6sXDhQqxZswYLFixQ38/Szs4O48aNw3vvvSc4Ou0bO3bsM7etWbNGj5HoT0BAAEJDQzF69Gi4uLhAqVQiNzcXhw8fhq%2Bvr%2BjwqJHgHLJGas2aNUZ5MTelZSD27t2Ljz76CO7u7nB2dkaTJk1w9%2B5dZGZmIjIyElOnToWnpydWrFhhNJWU8vJy7NixAw8fPsSkSZPg7OyMR48eITw8HMuXLzfam08/VlhYCDMzM6P%2BVClQ%2B0bi4sWL6jcWAJCfn4%2BkpCScP39eYGS6oVQqsW/fPiQnJyMvLw%2BVlZVwdHTEkCFDMHXqVFhYWIgOkRoBJmQGzpQubKa4vMXly5eRkpKCgoIC1NTUoFWrVujXrx92796NtWvXIicnBy4uLqLD1Lqamhrcv38fVlZWsLOzEx2OTnl5eeHs2bNGuf7W02zcuBHbt2%2BHm5sbMjIy4OHhgaysLLRu3RozZ87Eq6%2B%2BKjpEIoPEIUsD9rwLmzGuXD9x4kS0bdsWo0aNwqhRo4xyntyTlEol0tPT8euvv6oT7uLiYvz888%2B4fv06ABhdMlZQUIBFixbh5MmTqK6uBgDI5XKMGDECCxYsgL29veAItW/w4MHYs2eP%2Bv6Oxm7fvn3Ys2cPunTpgp49eyIuLg4VFRVYvHixUS/yvHv3bhw5cgR37tyBTCZDu3btMHbsWIwZM0Z0aNRIsEJmwIYOHYpt27apL2wZGRnqC9vw4cMxcuRI0SFqVWFhIY4dO4bk5GScOnUKTk5O6uTMGBfBjY6OxvHjx%2BHl5YXvv/8e/v7%2BuHLlCiwtLbFw4UKjnFM1bdo0VFdXY%2BrUqWjXrh1UKhVu376NnTt3wsrKyijv8zdz5kz88ssvMDc3R5s2beokJY35FlFP4%2Bnpqa7ee3h4IC0tDebm5rh37x4mTpyIpKQkwRFq3/r167Fv3z4EBgaiffv2AICsrCwcOHAAkZGRCAkJERwhNQbG%2B3bFCDx8%2BBBdunQBULsEhlKphJWVFaKiojBx4kSjS8hatmyJoKAgBAUFobS0FCkpKUhKSsKkSZPQpk0bJCYmig5Rq5KTk7Fv3z60adMGSUlJWLlyJVQqFVavXo1r164ZZUJ24cIFpKSkoFmzZuq2F154Af369cOwYcPEBaZD3bt3R/fu3UWHoTcdOnRAQkICxo4dCycnJyQnJ8PX1xfV1dW4f/%2B%2B6PB0IiEhAV9%2B%2BWWdT4j7%2B/vj/fffZ0JG9cKEzICZ4oXtsaZNm8LBwQFt2rRB69atkZeXJzokrauoqFBPYjc3N0dlZSUsLS3xzjvvYPTo0Zg4caLgCLXPxcUFjx490kjIAM1/C2PzvHtyGuNCuO%2B99x7Cw8PxyiuvYMqUKYiKikKnTp2Ql5dntEl3SUmJ%2Bs3zk7p16waFQiEgImqMmJAZsKioKMyZM%2BepF7bhw4eLDk/rKisrkZqaiuTkZJw4cQJKpRIjRozAvHnz0L9/f9Hhad0LL7yAmJgY/O///i86duyIvXv3YvLkycjNzcWjR49Eh6c1t27dUv88Y8YMvPfee5g8eTI6d%2B4MMzMz3Lp1C3FxcQgPDxcYpW5dv34dly5dqvPhnK%2B%2B%2BgqTJk0SGJl2BAQEqO%2BksWzZMvz000%2BQy%2BWYMGECXF1dkZmZCWdnZ/j5%2BQmOVDe6dOmCffv21amEJSQkqIcwiX4P55AZuLKyMlhbWwOoXZ/q8YXN19fX6CbIenh4wNLSEj4%2BPvDz88OAAQOM7hyflJmZiaioKCQmJuKnn37C3LlzYWlpiYqKCkyePBkffPCB6BC1wt3dHTKZDL93qZHJZLhy5YqeotKf3bt3Y%2BnSpWjVqhXu3buH1q1bQ6FQwNnZGZMnT8bUqVNFhyjZ0KFD4eHhgXbt2mH79u2YPn36M3/fUVFReo5O99LS0jBjxgw4Ozur57tmZWUhJycHGzduxJAhQwRHSI0BEzIyGCkpKUafhD3PzZs3ceXKFTg7OxvVDcXv3LlT732dnZ11GIkYI0aMwLJly/Dyyy%2BrP5xTUFCA5cuX44033oCXl5foECX7%2BeefERsbi5KSEpw9e/aZ5ySTybBz5049R6cf9%2B/fR2JiIv79738DqJ1y4ufnBycnJ7GBUaPBhMzAPL49Un0Ywz3hNmzYgDlz5gAA1q5d%2B9x9jfGdtSmoqqpSL4z55JDd01haWuojJL3y8PBAeno6AKB3795IT0%2BHTCbDnTt3MHPmTHz77beCI9Su0NBQ9f1KTcXj5VxSU1PVy7lYW1sb9XIupH2mWYowYMa4%2Bv7z/PLLL%2BqfH/%2Bn9TSmsqimMfLy8lL/nnv27Pnc36UxDlk6OTnh9OnTePnll%2BHg4IC0tDT06dMHzZo1Q05OjujwtM7UkjEAmDdvHpRKJT7//PM6y7m8//77RrmcC2kfK2QGrri4GEqlEi1btgQA5OTkwMbGRv3YmBQUFMDBwUF0GKRlaWlp6iGsM2fO4P79%2B%2BqbxT98%2BFB937%2BuXbuib9%2B%2BIkPViYMHD2LBggU4ffo04uLi8OWXX6JPnz64efMm2rVrh23btokOkSTy8PCos5wLUPv6HjZsGM6dOycoMmpMzEQHQM92%2BvRpeHt749SpU%2Bq2f/zjHxg5ciR%2B/vlngZHpxtChQ/Hmm28iPj4eRUVFosMhLXlyPlFeXh4WLlyIvn37okePHli5ciXWrFmDL774AtnZ2QKj1J0xY8bg6NGjsLW1RXBwMGbOnInWrVsjKCgI69atEx0eacHj5Vz%2BmzEv50LaxwqZARs7dizefPNNjB07VqP98OHD2LZtG7755htBkenG5cuXkZycjKSkJNy6dQv9%2BvWDv78/Ro4cWeedJzVOr776Kj788EMMHDgQf//73xEXF4cDBw7gxo0biIqKwuHDh0WHqHX3799HdHQ0UlJSUFlZCZVKBWtrawwdOhQfffQR5xc1Uk8u55KRkaFetua/l3MJCQkx2uU%2BSLuYkBmwJ2878qSqqir07dv3uXOuGrtff/0VSUlJSEpKwtWrVzFw4EBs3rxZdFgkUe/evXHhwgUAQFhYGHr06IF3330XgObkd2MSGhoKmUyGqVOnqj9xl5OTg9jYWJiZmSE2NlZwhPRHmPpyLqR9nNRvwNq1a4ekpKQ6764OHDhg9B%2Blbt%2B%2BPfz9/WFtbY0mTZogJSVFdEikBfb29sjPz4elpSVOnTqFiIgIALWLpMrlcsHR6UZGRgZSU1M1qrzu7u7w8vLC0KFDBUZGUhw7dkx0CGRkmJAZsHnz5iE8PBxbtmyBi4sLampqcPPmTeTl5RntROBr164hOTkZx44dw/Xr1%2BHl5YXRo0dj48aNokMjLQgJCUFQUBDMzc3Rr18/uLm5oaSkBJGRkUY7rOPq6ory8vI6w%2B5KpRKurq6CoiKpjHHNPBKLQ5YGLj8/H0eOHEFOTg5UKhXat2%2BPgIAA9afUjImPjw/y8/Px0ksvwc/PD76%2BvpxfY4TS09NRXFyM/v37w9LSEtXV1di%2BfTumTZumXq/MmPzwww/4%2Buuv8cYbb6BDhw6oqanB7du3sXv3bowZM0ZjEeCOHTsKjJSIRGJCZsAeTwb%2Bxz/%2BoV5Q09raGsOGDcOiRYuMLlnZsmULxo8fb5TJJpkud3f3525/PA%2BJc42ITBsTMgNmapOBPTw8cO7cOZiZcTUWMh6mfusoIqofJmQGrFevXnUmAwNAUVERhg4dqrHKvTFYsWIF5HI5ZsyYARsbG9HhEBER6Q0n9RswU5sMnJqaCoVCga1bt8LOzq7Och/GcO9OIiKip2GFzICZ2mTg31vo9r8XyCUiIjIWTMgMGCcDExERmQYmZAbM1CYDL1iw4LnbP/30Uz1FQkREpF%2BcQ2bAjCHJaoiKigqNx0qlEtnZ2cjNzYW/v7%2BgqIiIiHSPCRkZjLVr1z61/ZtvvsG1a9f0HA0REZH%2BcMiSDJ5SqUT//v1x5swZ0aEQERHpBCtkZDAe343gSeXl5Th69KhR3lKHiIjoMSZkZDB69uwJmUxWp93c3Bx//vOfBURERESkHxyyJINx5swZ3L9/X30vy4cPH%2BJf//oXBgwYgJ49ewqOjoiISHeYkJHBOHjwIKKjo3H%2B/HmUlZXhtddeAwA8ePAA8%2BbNw%2Buvvy44QiIiIt3gXZzJYHzxxRfYuHEjACAxMRGWlpY4cuQIYmNjsX37dsHRERER6Q4TMjIYubm5GDhwIAAgJSUFo0aNgrm5Odzc3HD37l3B0REREekOEzIyGPb29sjPz0dhYSFOnToFb29vAEB%2Bfj7kcrng6IiIiHSHn7IkgxESEoKgoCCYm5ujX79%2BcHNzQ0lJCSIjI%2BHn5yc6PCIiIp3hpH4yKOnp6SguLkb//v1haWmJ6upqbN%2B%2BHdOmTeNaZEREZLSYkBEREREJxjlkRERERIIxISMiIiISjAkZERERkWBMyIiIiIgEY0JGREREJBgTMiIiIiLBmJARERERCcaEjIiIiEiw/wfrggSkZM039gAAAABJRU5ErkJggg%3D%3D" class="center-img">
</div>
    <div class="row headerrow highlight">
        <h1>Sample</h1>
    </div>
    <div class="row variablerow">
    <div class="col-md-12" style="overflow:scroll; width: 100%%; overflow-y: hidden;">
        <table border="1" class="dataframe sample">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>pclass</th>
      <th>survived</th>
      <th>name</th>
      <th>sex</th>
      <th>age</th>
      <th>sibsp</th>
      <th>parch</th>
      <th>ticket</th>
      <th>fare</th>
      <th>cabin</th>
      <th>embarked</th>
      <th>boat</th>
      <th>body</th>
      <th>home.dest</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>Allen, Miss. Elisabeth Walton</td>
      <td>female</td>
      <td>29.0000</td>
      <td>0</td>
      <td>0</td>
      <td>24160</td>
      <td>211.3375</td>
      <td>B5</td>
      <td>S</td>
      <td>2</td>
      <td>NaN</td>
      <td>St Louis, MO</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>Allison, Master. Hudson Trevor</td>
      <td>male</td>
      <td>0.9167</td>
      <td>1</td>
      <td>2</td>
      <td>113781</td>
      <td>151.5500</td>
      <td>C22 C26</td>
      <td>S</td>
      <td>11</td>
      <td>NaN</td>
      <td>Montreal, PQ / Chesterville, ON</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>0</td>
      <td>Allison, Miss. Helen Loraine</td>
      <td>female</td>
      <td>2.0000</td>
      <td>1</td>
      <td>2</td>
      <td>113781</td>
      <td>151.5500</td>
      <td>C22 C26</td>
      <td>S</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Montreal, PQ / Chesterville, ON</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>0</td>
      <td>Allison, Mr. Hudson Joshua Creighton</td>
      <td>male</td>
      <td>30.0000</td>
      <td>1</td>
      <td>2</td>
      <td>113781</td>
      <td>151.5500</td>
      <td>C22 C26</td>
      <td>S</td>
      <td>NaN</td>
      <td>135.0</td>
      <td>Montreal, PQ / Chesterville, ON</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>0</td>
      <td>Allison, Mrs. Hudson J C (Bessie Waldo Daniels)</td>
      <td>female</td>
      <td>25.0000</td>
      <td>1</td>
      <td>2</td>
      <td>113781</td>
      <td>151.5500</td>
      <td>C22 C26</td>
      <td>S</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Montreal, PQ / Chesterville, ON</td>
    </tr>
  </tbody>
</table>
    </div>
</div>
</div>




```python
df.shape
```




    (1309, 14)




```python
df.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>pclass</th>
      <th>survived</th>
      <th>age</th>
      <th>sibsp</th>
      <th>parch</th>
      <th>fare</th>
      <th>body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1309.000000</td>
      <td>1309.000000</td>
      <td>1046.000000</td>
      <td>1309.000000</td>
      <td>1309.000000</td>
      <td>1308.000000</td>
      <td>121.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2.294882</td>
      <td>0.381971</td>
      <td>29.881135</td>
      <td>0.498854</td>
      <td>0.385027</td>
      <td>33.295479</td>
      <td>160.809917</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.837836</td>
      <td>0.486055</td>
      <td>14.413500</td>
      <td>1.041658</td>
      <td>0.865560</td>
      <td>51.758668</td>
      <td>97.696922</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>0.166700</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2.000000</td>
      <td>0.000000</td>
      <td>21.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>7.895800</td>
      <td>72.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3.000000</td>
      <td>0.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>14.454200</td>
      <td>155.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>39.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>31.275000</td>
      <td>256.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>80.000000</td>
      <td>8.000000</td>
      <td>9.000000</td>
      <td>512.329200</td>
      <td>328.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.describe().iloc[:,:2]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>pclass</th>
      <th>survived</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1309.000000</td>
      <td>1309.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>2.294882</td>
      <td>0.381971</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.837836</td>
      <td>0.486055</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3.000000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>3.000000</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.isnull().sum()
```




    pclass          0
    survived        0
    name            0
    sex             0
    age           263
    sibsp           0
    parch           0
    ticket          0
    fare            1
    cabin        1014
    embarked        2
    boat          823
    body         1188
    home.dest     564
    dtype: int64




```python

```
