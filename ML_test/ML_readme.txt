Machine learning Model data source: ml_cleaned_df.csv

This data base includes data from
1. Data_1: https://www.cdc.gov/nchs/nhis/2020nhis.htm :
The target population for the NHIS is the civilian noninstitutionalized population residing within 
the 50 states and the District of Columbia at the time of the interview.the sample is expected to yield 30,000 sample adult completed interviews. 

2. Data_2: https://www.mhanational.org/
This sources has provided mental health workforce availability by states. 
The term “mental health provider” includes psychiatrists, psychologists,
licensed clinical social workers, counselors, marriage and family
therapists, and advanced practice nurses specializing in mental health
care.

3. Data_3: from U.S. Bureau of Labor Statistics Latest Numbers

US unemlpoyment rates by states from 2019-2021

OLS Assumtions

Linearity: A linear relationship exists between the dependent and predictor variables. If no linear relationship exists, linear regression isn't the correct model to explain our data.
No multicollinearity: Predictor variables are not collinear, i.e., they aren't highly correlated. If the predictors are highly correlated, try removing one or more of them. Since additional predictors are supplying redundant information, removing them shouldn't drastically reduce the Adj. R-squared (see below).
Zero conditional mean: The average of the distances (or residuals) between the observations and the trend line is zero. Some will be positive, others negative, but they won't be biased toward a set of values.
Homoskedasticity: The certainty (or uncertainty) of our dependent variable is equal across all values of a predictor variable; that is, there is no pattern in the residuals. In statistical jargon, the variance is constant.
No autocorrelation (serial correlation): Autocorrelation is when a variable is correlated with itself across observations. For example, a stock price might be serially correlated if one day's stock price impacts the next day's stock price.


