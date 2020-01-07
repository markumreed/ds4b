# Data Science Basics for Business

## Types of Data Science

1. Descriptive Analytics (Business Intelligence): Get useful data in front
of the right people in the form of dashboards, reports, and emails
  - Which customers have churned?
  - Which homes have sold in a given locaAon, and do homes of a
 certain size sell more quickly?

1. Predictive Analytics (Machine Learning): Put data science models continuously into production
  - Which customers may churn?
  - How much will a home sell for, given its location and number of rooms?

1. Prescriptive Analytics (Decision Science): Use data to help a company make decisions
  - What should we do about the particular types of customers that are prone to churn?
  - How should we market a home to sell quickly, given its location and number of rooms?

## Standard Data Science Workflow
1. Data Collection: Compile data from different sources and store it for efficient access
1. Exploration and Visualization: Explore and visualize data through dashboards
1. Experimentation and Prediction: The buzziest topic in data science - machine learning

## Building a Data Science Team
Your team members require different skills for different purposes.

| **Data Engineer**       | **Data Analyst**            | **Machine Learning Engineer**                    | **Data Scientist**                              |
|-------------------------|-----------------------------|--------------------------------------------------|-------------------------------------------------|
| Store and maintain data | Visualize and describe data | Write production-level code to predict with data | Build custom models to drive business decisions |
| SQL/Java/Scala/Python   | SQL/BI Tools/ Spreadsheets  | Python/Java/R                                    | Python/R/SQL                                    |

## Data Science Team Organizational Models

### Centralized/isolated

The data team is the owner of data and answers requests from other teams.

![Centralized data team structure chart](https://github.com/SoIllEconomist/ds4b/blob/master/python_ds4b/00_introduction/centralized_team.png?raw=1)

### Embedded
Data Experts are dispersed accross an organization and report to functional leaders

![embedded data team structure chart](https://github.com/SoIllEconomist/ds4b/blob/master/python_ds4b/00_introduction/embedded_team.png?raw=1)

### Hybrid
Data experts sit with functional teams and also report to the Chief Data Scientist - so data is an organizational priority.

![Hybrid data team structure chart](https://github.com/SoIllEconomist/ds4b/blob/master/python_ds4b/00_introduction/hybrid_team.png?raw=1)

## Exploration and Visualization
The type of dashboard you should use depends on what you'll be using it for. 

### Common Dashboard Elements

| **Type**          | **What is it best for?**       | **Example**              |
|-------------------|--------------------------------|--------------------------|
| Time series       | Tracking a value over time.    | Monthly active users     |
| Stacked bar chart | Tracking composition over time | Web Traffic Source       |
| Bar Chart         | Categorical comparison         | Page visit length by age |


### Popular Dashboard Tools
| **Spreadsheets** | **BI Tools** | **Customized Tools** |
|------------------|--------------|----------------------|
| Excel            | Power BI     | R Shiny              |
| Sheets (Google)  | Tableau      | d3.js                |
|                  | Looker       | Plotly/Bokeh         |

### When you should request a dashboard
1. When you'll use it multiple times
1. When you'll need the information updated regularly
1. When the request will always be the same

## Experimentation and Prediction
### Machine Learning
Machine learning is an application of artificial intelligence (AI) that builds algorithms ad statistical models to train data to address specific questions without explicit instructions. 

|             | **Supervised Machine Learning**                                      | **Unsupervised Machine Learning**                                   |
|-------------|----------------------------------------------------------------------|---------------------------------------------------------------------|
| **Purpose** | Makes predictions from data with labels and features                 | Makes predictions by clustering data with no labels into categories |
| **Example** | Recommendation systems, email subject optimization, churn prediction | Image segmentation, customer segmentation                           |

### Special Topics in Machine Learning

1. Time series forecasting is a technique for predicting events through a sequence of time and can captuer seasonality or periodic events.
1. Natural Language Processing (NLP) allows computer to process and analyze large amounts of natural langauge data. 
  - Text as input data
  - Word counts track the importance of words in a text
  - Word embeddings create features that group similar words

| **Deep Learning / Neural Networks** enables unsupervised machine learning using data that is unstructured or unlabeled. | **Explainable AI** is an emerging field in machine learning that applies AI such that results can be easily understood. |
|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Highly accurate predictions                                                                                             | Understandable by humans                                                                                                |
| Better for "What?"                                                                                                      | Better for "Why?"                                                                                                       |

