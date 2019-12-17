#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Nov  7 09:21:02 2018

@author: markumreed
"""

import turtle
bob = turtle.Turtle()
print(bob)
turtle.mainloop()

for i in range(4):
    bob.fd(100)
    bob.lt(90)
    
turtle.done()