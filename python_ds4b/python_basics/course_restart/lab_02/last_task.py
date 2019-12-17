# last_task.py
# Prof Lillian Lee
# Feb 2018

"""Gives satisfying response when students correctly implement natural_hi()
in module greetings"""

import greetings

print()  # print some blank lines to make output easier to see
print() 
output = greetings.natural_hi()
if output is not None and output.startswith("hi "):
    print(output)
    print("Congratulations on completing your first program for CS1110!!")
else:
    print("It seems that you haven't successfully completed the lab yet.")
