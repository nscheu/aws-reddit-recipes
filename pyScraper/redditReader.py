#!/usr/bin/python
import praw

reddit = praw.Reddit('bot1')

subreddit = reddit.subreddit("GifRecipes")

opFile = open("data/redditDataRAW.txt", "w+")

for submission in subreddit.hot(limit=5):
    print("Title: ", submission.title)
    opFile.write("Title: \n")
    opFile.write(submission.title + "\n")
    print("Text: ", submission.selftext)
    opFile.write("Text: \n")
    opFile.write(submission.selftext + "\n")
    #print("Score: ", submission.score)
    #opFile.write("Score: ")
    #opFile.write(submission.score)
    print("ThumbURL: ", submission.thumbnail)
    opFile.write("ThumbURL: \n")
    opFile.write(submission.thumbnail + "\n")
    print("GIF URL::: ", submission.url)
    opFile.write("GIF URL::: \n")
    opFile.write(submission.url + "\n")
    opFile.write("***********************************\n")
    print("***********************************\n")	
print("---------------------------------\n")
