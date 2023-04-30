# My Workout Tracker Client
I'm building a web application to help me keep track of my workouts. It could be helpful for you as well. 
### Client Installation
- Fork or clone this repo
- Run the following commands in the folder
    ```
    yarn
    yarn next dev
    ```
- Update the `.env.example` file to read `.env.local` and add the correct URL for `NEXT_PUBLIC_API_URL` (which ever ip/port you use for your local server)
- To deploy I used [Vercel](https://vercel.com) which is set to deploy any changes to the `main` branch. 

### App usage
- To use this application go to the [website](https://my-workout-tracker.vercel.app/) to create your account
- Once you confirm your email you'll be re-directed to the `user` page, here you can fill in your username, full name, and website. 
    - Note these features are kind of useless right now, I intend to introdoce some kind of `users` page where you can view all users on the platform. 
- You can now visit the `tasks` page, here you will find 4 folders to put your workouts in (this is a work in progress). 
    - The `task` folder will have general tasks you want to work on. e.g. drink more water, work on your finances, improve mental health, etc. 
    - The `activity` folder will hold any `activity` you create. An activity is usually an exercise movement that has a name, description, and a url field for any videos you want to add. 
    - The `plan` folder will hold `plans`, which contain multiple activies, you create. These plans can then be copied into a `routine`.The `activies` in each `plan` will be independent of the ones in the `activies` folder, the `plan` tasks in the folder are sort of a 'draft' and not intended to be worked on directly. Each plan will have a name, description, and five editable 'tags' you can add (weight, reps, sets, etc)
    - The `routine` folder will hold any `routines`, which contain multiple plans, you create. The `plans` in each `routine` will be independent of the ones in the `plan` folder. Once a plan is moved into a `routine` it can be worked on and recorded. 
- Clicking on the expand icon will re-route you to a new page displaying only the selected task and the sub tree. 

### Changes
- This started off as a simple habit tracker with a nested task list
- Slowly turning it into something I can use more often. 