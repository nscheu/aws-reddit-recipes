#!/usr/bin/python
import praw
import json

reddit = praw.Reddit('bot1')

subreddit = reddit.subreddit("GifRecipes")

opFile = open("public/data/redditDataRAW.txt", "w+")

def pp_json(json_thing, sort=True, indents=4):
    if type(json_thing) is str:
        print(json.dumps(json.loads(json_thing).__dict__, sort_keys=sort, indent=indents))
    else:
        print(json.dumps(json_thing, sort_keys=sort, indent=indents))
    return None

#pp_json(your_json_string_or_dict)

for submission in subreddit.hot(limit=5):
    opFile.write(str(vars(submission)))

#for submission in subreddit.hot(limit=5):
#    opFile.write(submission)
#    print("Title: ", submission.title)
#    opFile.write("Title: \n")
#    opFile.write(submission.title + "\n")
#    print("Text: ", submission.selftext)
#    opFile.write("Text: \n")
#    opFile.write(submission.selftext + "\n")
#    #print("Score: ", submission.score)
#    #opFile.write("Score: ")
#    #opFile.write(submission.score)
#    print("ThumbURL: ", submission.thumbnail)
#    opFile.write("ThumbURL: \n")
#    opFile.write(submission.thumbnail + "\n")
#    print("GIF URL::: ", submission.url)
#    opFile.write("GIF URL::: \n")
#    opFile.write(submission.url + "\n")
#    opFile.write("***********************************\n")
#    print("***********************************\n")
#print("---------------------------------\n")
