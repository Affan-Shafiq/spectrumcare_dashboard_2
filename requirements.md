### For each page and card:
1. What data does it display? 
   - Example: total users, daily active users, growth percentage, revenue, etc.
2. What time range does it represent?
   - Today, last 7 days, last month, all time?
3. How often should it update?
   - On page load
   - On refresh button
   - Real-time updates
4. Who is allowed to see it?
   - Admin only
   - All logged-in users
   - Role-based access
### Create a simple document listing:
- Page name
- Components on that page
- Data source per component
- Update behavior
### **How Backend will work** :
- Backend layer + Firebase
  - React -> Backend API -> Firebase
- Backend Handles:
   - Aggregations (totals, percentages and trends for graphs)
   - Validation
   - Security Rules
- Frontend only consumes clean APIs


### actual requirements start here ↓

---
---
---



## Page 0: "Login portal" ( address/login ) :

- At the moment no structure in firebase for separation in admin functionality
   1. Make admin table for auth:
      - **Cnic** → *primary key*
      - Full Name
      - Phone
      - Email
      - "Sirf aik admin ho ga"
      - "Moderators ka role hona chahiye ham as an admin 24/7 moderation tou nhi kr sakty"
   2. Make Moderators table with same stuff.

## Page 1: "Main Dashboard" ( address/dashboard ) :
### Row of 4 cards:
- Total users ( +% Registered users )
- Active users ( +% Active Users )
- Screenings Completed ( +% Total Assessments )
- Community Posts ( +% User Interactions )

<div style="margin-left: 2em;">

**Questions :**
1. Do we actually calculate all these aggregates and show them here? 
2. how is user engagement calculated?? 
</div>

### Row of 3 cards:
- Model performance (%)
- New Users (int)
- System Status

<div style="margin-left: 2em;">

**Questions :**
1. How and where are we storing the Model performance? *(technically can be calculated within the backend api function for this)*
2. Are we really checking system status?
3. If 2 was yes, then does system status have a way to be reported from the mobile app?? if not mobile app then where is this coming from? 
</div>

### Row of 1 card:
- Key Metrics:
  - User engagement (repeated btw)
  - Avg Screenings/User
  - Posts/Active user
  - System uptime (Repeated btw)

<div style="margin-left: 2em;">

**Questions :**
1. Do we actually show the REPEATED aggregates here? 
2. **how is user engagement calculated??** 
</div>

### Update frequency
- On page refresh? or time based?
### Access:
- Super Admins + Mods (right??)


## Page 2: "User Activity" ( address/user-activity ) :
### Row of 3 cards:
- Weekly active users
- Weekly Screenings
- Community Posts 

<div style="margin-left: 2em;">

**Questions :**
1. Duplication with the main dashboard cards...are we showing these here again?? 
</div>

### Row of 2 + 1 cards (graphs) :
- Daily user activity (weekly users/day)
- Daily Screenings Completed (weekly screenings/day)
- Combines graph (above two + Community posts/weekly)

<div style="margin-left: 2em;">

**Questions :**
1. Duplication with the main dashboard cards + Same page graphs...are we showing these here again?? 
2. Do we need this "User Activity" page at all??
</div>

### NOTE: <u>User Activity</u> page didnt have any interactable stuff like buttons etc. Used for info-dump only

## Page 3: "ML Reports" ( address/ml-reports ) :
### Actions :
- Export Report
- Refresh Data

<div style="margin-left: 2em;">

**Questions :**
1. format for report?
2. where does the data in the report come from??

</div>

### Row of 4 cards dealing w model info:
- Overall Accuracy %
- Precision %
- Recall %
- F1 Score %

### Row of 2 cards :
1. Model Information (USEFUL STUFF):
   - type (text)
   - version (float)
   - training data (int)
   - features (text)
   - last updated (timestamp)
2. Performance Metrics (Repeated but in the form of bar graph)

<div style="margin-left: 2em;">

**Questions :**
1. Are there actually going to be versions of the model??
2. Model updation timestamp exist??
</div>

### Row of 1 card (Table) : 
- Recent Screening Reukts: 
  - user
  - date
  - score
  - risk level
  - accuracy
  - duration

<div style="margin-left: 2em;">

**Questions :**
1. Data means for this table?? or independently pull from throughout the database?
2. what does accuracy mean here?? therapist sy baat karny k baad hee pata chlta hai k kiya scene tha, tou uskay baad likhi jayegi idhr accuracy? 
</div>

### Row of 1 card (Info dump) : 
- is this really REQUIRED?? 

## Page 4: "Community" ( address/community ) :
### 4 cards:
  - total posts, pending review, flagged posts, approved posts (All numbers)

### 1 card TABLE Posts Moderation Queue:
- view of posts (filters available)
- ACTIONS:
   1. View Post
   2. Approve Post
   3. Remove Post

<div style="margin-left: 2em;">

**Questions :**
1. what are the changes in database for approved and removed posts? 
</div>

### 1 card TABLE Reported Posts/Comments :
- shows reported posts and comments
- ACTIONS:
  1. View Post / Comment
  2. Approve 
  3. Remove


## Page 5: "Content" ( address/content ) :
### Main types : 2
- Table with 2 tabs
   1. Blog Posts
      - Title
      - Author
      - Timestamp
   1. Video Content
      - Title
      - Link
      - timestamp
      - category
  -Actions:
   1. View
   2. Edit
   3. Delete
   4. Add

## Page 6: "Therapists" ( address/therapists ) :

### Therapists schema:
- ?

### Top cards for statistics (4):
- total applications
- pending review
- under review
- approved
 
### Actual Applications section:
   - row by row view of therapists who applied for verification
   - fields:
      - name
      - specialization
      - experience
      - location
      - status (flags like pending)
      - actions ( approve / disapprove / view details )
        - **approve** : turns the "status" flag in the respective "Therapists" document to 'approved'
        - **disapprove** : turns the "status" flag in the respective "Therapists" document to 'disapproved', and **<u>when that person looks at their status they see "disapproved"</u>** *...and a button for try again appears (?)*
        - **view details** : view the details of the applicant.
          - personal information:
            - name
            - mail
            - phone
            - location
            - applied date
          - professional details:
            - experience : ~ years
          - specializations:
            - tags
          - qualifications:
            - all the qualifications  *in scanned form? or plain text?*
          - documents:
            - license
            - certificate  (?)
            - resume
### Approved Therapists List ( + view details )
<div style="margin-left: 3em;">

### → Recently Approved Therapists Sublist (upto a week ? )
</div>

### Disapproved Therapists List ( + view details )


### QUESTIONS :
1. Application status deals with which flag in the current schema? "isVerified" or "status" ?
2. Should we add "Application" subdocument in the therapists schema? **Easier handling of applications...**
3. Timestamps needed for application approval time.
4. Qualifications + Documents storage how??
5. (IN MOBILE APP) are we showing anything to the therapist whose application got rejected?
6. Should we keep details of disapproved/rejected therapists?
   1. To prevent duplication attempts.
   2. in case we do show a 'submit another request' to the rejected therapist on the mobile app.






---
---
---

### Work on backend started as of 11 pm, 21 dec 20205
What i've been doing:
   - Get Firebase service account key
     - Firebase Console → Project Settings → Service Accounts → Generate new private key
     - Saved as: F:\data\Uni\FYP\spectrum-care-d8... .json 
     - **NEVER COMMIT**
