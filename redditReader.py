#!/usr/bin/python
import praw
import json

# Praw - create an instance using bot1
reddit = praw.Reddit('bot1')

# Select the subreddit to read
subreddit = reddit.subreddit("GifRecipes")

# Opens a file to write or append to -- (To be read by webserver)
opFile = open("public/data/redditDataRAW.json", "w+")


# TODO : Delete this - useful generally but not in this script
def pp_json(json_thing, sort=True, indents=4):
    if type(json_thing) is str:
        print(json.dumps(json.loads(json_thing).__dict__, sort_keys=sort, indent=indents))
    else:
        print(json.dumps(json_thing, sort_keys=sort, indent=indents))
    return None
#pp_json(your_json_string_or_dict)

# Get the Posts from the given subreddit
submissionObjects = subreddit.hot(limit=5);

# Start the output string
outputJson = '{ "submissions" : ['

# For each Post in the Subreddit Checked Above: Generate a string of object attributes and properties
for sub in submissionObjects:
    outputJson += "{" + '"title":' + '"' + sub.title + '",'
    print sub.title
    outputJson += '"author":' + '"' + str(sub.author) + '",'
    print sub.author
    outputJson += '"thumbnail":' + '"' + sub.thumbnail + '",'
    print sub.thumbnail
    outputJson += '"url":' + '"' + sub.url + '",'
    print sub.url
    outputJson += '"score":' + '"' + str(sub.score) + '",'
    print sub.score
    # Time stamp perhaps to help unique ID posts
    outputJson += '"created":' + '"' + str(sub.created) + '"' + "},"
    print sub.created
    print "*****"

# Removes the last comma to ensure valid JSON
outputJson = outputJson[:-1]
# Ends the Array and JSObject
outputJson += "] }"

# Print the final String
print outputJson

# Write the final String to file
opFile.write(outputJson)