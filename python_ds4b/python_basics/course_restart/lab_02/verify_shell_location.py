# verify_shell_location.py
# Prof Lillian Lee, Molly Feldman, and Amol Tandel
# Feb 2018;

"""Check if the user has placed this and all the lab02 files in Desktop->lab02"""

import os
import sys
import platform

if platform.system() == "Windows":
    import getpass
    if os.path.isdir('C:\\Users\cit-labs'):
        # lab machines do something different with the home directory 
        desired_dir = 'C:\\Users\cit-labs\Desktop\lab02'
    else:                    
        desired_dir = 'C:\\' + os.path.join('Users', getpass.getuser(), 'Desktop', 'lab02') 
else:
    desired_dir = os.path.expanduser("~/Desktop/lab02")

if os.getcwd() != desired_dir:
        print()
        print("WARNING: your working directory may not be right.")
        print("  We were expecting " + desired_dir)
        print("  but your working dir is " + os.getcwd())
        print()
        print("*** Ask a staff member to check whether your directory is correct. ***")
        print()

filenames = ["verify_shell_location.py",
              "greetings.py",
              "test_rand_hi.py",
              "last_task.py",
              "run_multi_hi.py"]
test_results = []

for f in filenames:
    test_results.append(os.path.isfile(f))

if all(test_results):
    print
    print("The command shell's working directory contains the files for this lab.")
    print("Hurrah!")
else:
    print("WARNING: This directory seems to be missing at least one file.")
    print("Diagnostic info: ")
    for i in range(len(filenames)):
        print (filenames[i] + ": " + ("found" if test_results[i] else "not found"))
    print("*** Ask a staff member for help. ***")
