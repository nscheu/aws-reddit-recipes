#!/usr/bin/python
import praw
import json

# Praw - create an instance using bot1
reddit = praw.Reddit('bot1')

# Select the subreddit to read
subreddit = reddit.subreddit("GifRecipes")

# Opens a file to write or append to -- (To be read by webserver)
opFile = open("redditDataRAW.json", "w+")

# Get the Posts from the given subreddit
submissionObjects = subreddit.new(limit=1000);

# Start the output string
outputJson = '{ "submissions" : ['

# For each Post in the Subreddit Checked Above: Generate a string of object attributes and properties
for sub in submissionObjects:
    outputJson += "{" + '"title":' + '"' + sub.title.replace('"','') + '",'
    outputJson += '"author":' + '"' + str(sub.author).replace('"','') + '",'
    outputJson += '"thumbnail":' + '"' + sub.thumbnail.replace('"','') + '",'
    outputJson += '"url":' + '"' + sub.url.replace('"','') + '",'
    outputJson += '"score":' + '"' + str(sub.score).replace('"','') + '",'
    # Time stamp perhaps to help unique ID posts
    outputJson += '"created":' + '"' + str(sub.created).replace('"','') + '"' + "},"

# Removes the last comma to ensure valid JSON
outputJson = outputJson[:-1]
# Ends the Array and JSObject
outputJson += "] }"

# Print the final String
#print outputJson.encode('utf-8')

# Write the final String to file
opFile.write(outputJson.encode('utf-8'))
