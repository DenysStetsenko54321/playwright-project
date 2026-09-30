
1. ## Screenshots generation on OS's different form MacOS

To generate screenshots on Windows/Linux - run 

```bash 
npx playwright test --update-snapshots 
```

It will generate scrrenshots for OS the command was ran on and tests should pass during that same run

Other way is to ran tests in any avaylable way, it will create the reference screenshots, but will fail that first run. On the next run, the screenshot check should pass

I added annotations to affected tests and in README.md

> ## Screenshot checks
>
> The suite compares the application logo and banner against baseline screenshots
stored alongside the tests.
>
> Screenshot results can vary across operating systems and browser
versions. A contributor using another environment may need baselines
for that environment.
>
> Run command below to create screenshots for your OS
>
> ```bash 
> npx playwright test --update-snapshots 
> ```

**I learned to describe better all dependencies in comments, annotations, README**