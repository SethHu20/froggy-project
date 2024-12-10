# Project structure

The structure of the project utilises Next.js routing features allowing ease of navigation for the end user while making the development experience as simple as possible. As the project grows, we may find more and more files needed to be organise. Please use this document as a starting point for organisation, bring up questions if you are still unclear, and feel free to make recommendations to improve the project structure.

You may have realise that we *most likely* won't be using any fancy Next.js routing features, such as nested layouts and [more](https://nextjs.org/docs/app/building-your-application/routing). As most of the projects will feature client-side code and server side are kept to a minimum. There are very little Next.js features you would find here, and this document should provide a good starting point on the necessary stuffs you need to know to navigate around this project.

Here's a short list for what the project directory should look like:

- `app`
  - `(landing)`
    - `project`
    - `page.tsx`
    - ...
  - `(projects)`
    - `chess`
      - ...
    - `tetris`
    - `minesweeper`
    - ...
- `pages`
  - `docs`
    - ...
- `components`
- `public`
- `chess *`

More details and justification are found in here:

## app

Next.js recommends using the `app` folder as the main router application as it supports the most features, such as nested layouts, reusable layout and templates, server side stuffs.

Nextra (the documentation library used here) only supports pages. Luckily documentations don't need fancy features, and it does help with separating the documentation part of the project and the actual code part into two different root folders.

### (landing)

This folder houses various landing pages, sub-pages, and other non-project pages. Doing so allows us to easily reuse a layout (using `layout.tsx`) within the landing pages, we may not want these layout to appear in the actual project pages, that's why they are split into Next.js groups, which are folders with names in parenthesis.

The `project` subdirectory here is used to display the list of all projects, which will grow over time. It may reuse the layout as mentioned before and should show as a list format (You can learn about projects information are kept in [`project-list.json` documentation](/docs/project-list.json)). This should not be confused with the `../(projects)` subdirectory.

### (projects)

Here is a list of all projects, a very basic `layout.tsx` can be added for some Tailwind CSS stuffs, or some other error handling code, but it should be kept to a minimum so not to interfere with each sub-projects.

Each project will be a subdirectory, ideally it should be self contained. However since this project is heading for a monorepo structure, feel free to make libraries and utility functions that can be reused across multiple projects.

> **Note on `app/layout.tsx`**: on top of dedicated `layout.tsx` files found on either the landing page or projects page, there is a global `layout.tsx` file that is used for all pages. Recently this file was refactored to have basically nothing but some metadata. Part of the reason of the refactor is to reduce redundant divs just for styles like fonts and colours. It should hopefully not interfere with any project pages for maximum flexibility (if it does, please let us know). I'm still figuring out how "empty" the `(projects)/layout.tsx` should be, as of now it only contains html and body tags with font styles. If you intended to make new pages in either landing or projects section, and wanted the styling to be consistent, but without committing design choices to the global layout, affecting all pages, your option is to create another `layout.tsx` file for the appropriate subdirectory, and basing the design from `(landing)/layout.tsx`, as the landing page styles are most complete and consistent to the Froggy Project design.

## pages

As mentioned in [app](#app), **you should not** add anything in this directory except for documentation, which Nextra uses as it won't work with the `app` directory. Furthermore, all documentations are placed in the `pages/docs` subdirectory, so it is accessible with Next.js routing as `domain/docs/...`.

### docs

This is where the documentation pages are stored. Contributors are welcome to modify the content in this directory to include any necessary documentation to help with communication.

The documentation page is powered by [Nextra](https://nextra.site/), it also uses [MDX](https://mdxjs.com/), which lets you write plain markdown or markdown with React components (which I think is not needed for documentation). Simply add new markdown files and subdirectories to organise them, and Nextra will handle the rest to render it into a static website.

I highly recommend using word wrap in your IDE to make it easy to type markdown, most autoformatters (if there exist one for markdown) should work correctly without adding new line breaks.

## components

As of now, this directory stores the individual UI components (.tsx files) that are used to build the landing pages. We encourage splitting up the UI into reusable components that can find its use in individual project web pages.

Basically, decompose reusable code that you encounter and throw them here. We're not very strict with organisation in this folder, but making use of subdirectories is preferable.

It is highly recommended that reusable components *only used in a specific project* go into their respective [project directories](#-project-directories-eg-chess).

## public

This directory contains all kinds of assets, stuffs that are suitable here are:

- data files (JSON, CSV, plain text)
- images, svg, audio, video

## * Project directories (eg. Chess)

As mentioned above when discussing monorepos, we are currently experimenting with trying to put as much project code and logic in their project directory directly accessible from the root folder. Using chess project as example, codebase such as chess engine, especially non-Typescript code goes in `@/chess` directory. The corresponding `@/app/(projects)/chess` directory would only be used for UI related code, since it was there originally for the Next.js routing features. This *may potentially* help with Next.js when it tries to build the routing as it no longer needs to work with other non-relevant code for the web page, but more importantly we keep the Next.js territory clean, allowing us to have more freedom working within the root project directory, such as using Rust build tools and more.

It is also preferable that complex UI components, such as game window or interactive elements, go in project directories. This allows you more room to make subdirectories and create files/components without cluttering the [components directory](#components). You may also choose to store multimedia assets in a project directory rather than the [public directory](#public), that would be better but not necessary.

## Other files

JS frameworks and npm are notorious for generating a bunch of funny files, and I don't even know what most of them do. Here is a brief overview of each files and whether you should touch it.

### Stuffs safe to play around

- `.eslintrc.json`: JS linter config, this is not relevant most of the time.
- `.gitignore`: git ignore, please avoid committing generated / personal files by making use of this file
- `README.md`: readme page for out project and GitHub. You're more than welcome to improve on it.
- `tailwind.config.jsx`: configuration for Tailwind, feel free to add new themes, plugins, and paths as needed for the project.

### Stuffs you should inform us about

- `LICENSE`: I just used GPL v3, seems like a reasonable license and suitable for open source. Open to discuss if you're unhappy about the license choice
- `next.config.js`: Next.js configurations, we expect this to change over time as new features roll out, but it's better if we're informed about changes just in case it breaks other stuffs.
- `package.json`: npm dependencies management and other configurations. Keep the packages you install to a minimum, and if it has some issues and requires changing versions of existing libraries, please inform us so we can anticipate unexpected behaviours from affected libraries.
- `theme.config.jsx`: the theme used for Nextra documentation, which also includes the logo. It should be left there unless there are plans to improve on the looks of the documentation website.
- `tsconfig.json`: Typescript configs, it is very unlikely that we may need to change this file, but just in case any Typescript experts here can benefit from the file, it is best to let us know what changes are made.

### Stuffs you shouldn't touch

- `package-lock.json`: the autogenerated, more fragile version of `package.json`. If things went wrong somehow, delete this file and `npm build` again.
- `pnpm-lock.yaml`: also autogenerated for pnpm
- `postcss.config.js`: Used to get Tailwind working, there should be almost no other reason to touch this file.