# Data Grabber Tool
# Grabs data urls from a list of urls in a text document
Help()
{
   # Display Help
   echo "Helper function to download files via url."
   echo
   echo "Syntax: -data_grabber [-h] dir url_list_file"
   echo "options:"
   echo "h     Print this Help."
   echo "v     Verbose download mode" # TODO: Make a verbose mode
   echo
}

Verbose()
{
    echo "Coming Soon..."
}

# Get the options
while getopts ":h" option; do
   case $option in
      h) # display Help
         Help
         exit;;
   esac
done


dir="$1"
url_list="$2"

[ $# -eq 0 ] && { echo "Usage: $0 dir-name"; exit 1; }

if [ -d "$dir" -a ! -h "$dir" ]
then
   echo "$dir was found; placing files there"
   xargs -n 1 curl -s -O < $url_list
else
   echo "Error: $dir not found. Will make directory and place files in ${dir}."
   mkdir data
 cd data/
 xargs -n 1 curl -s -O < ../$url_list
fi
