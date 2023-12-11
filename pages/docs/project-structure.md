# Project structure

The structure of the project utilises Next.js routing features allowing ease of navigation for the end user while making the development experience as simple as possible.

You may have realise that we *most likely* won't be using any fancy Next.js routing features, such as nested layouts and [more](https://nextjs.org/docs/app/building-your-application/routing). As most of the projects will feature client-side code and server side are kept to a minimum.

Here's a short list for what the project directory should look like:

- app
  - (landing)
    - project
      - ...
    - page.tsx
    - ...
  - (projects)
    - chess
      - ...
    - tetris
      - ...
    - minesweeper
      - ...
    - ...
- pages
  - docs
    - ...

More details and justification are found in here:

## app

Next.js recommends using the `app` folder as the main router application as it supports the most features, such as nested layouts, reusable layout and templates, server side stuffs.

Nextra (the documentation library used here) only supports pages. Luckily documentations don't need fancy features, and it does help with separating the documentation part of the project and the actual code part into two different root folders.

### (landing)

This folder houses various landing pages, subpages, and other non-project pages. Doing so allows us to easily reuse a layout (using `layout.tsx`) within the landing pages, we may not want these layout to appear in the actual project pages, that's why they are split into Next.js groups, which are folders with names in parenthesis.

The `project` subdirectory here is used to display the list of all projects, which will grow over time. It may reuse the layout as mentioned before and should show as a list format. (TODO: How should we store the metadata for the projects? JSON, Markdown, or something else?). This should not be confused with the `../(projects)` subdirectory

### (projects)

Here is a list of all projects, a very basic `layout.tsx` can be added for some Tailwind CSS stuffs, or some other error handling code, but it should be kept to a minimum so not to interfere with each subprojects.

Each project will be a subdirectory, ideally it should be self contained. However since this project is heading for a monorepo structure, feel free to make libraries and utility functions that can be reused across multiple projects.

## pages

As mentioned in [app](#app), you should not add anything project related in this directory except for documentation, which Nextra uses as it won't work with the `app` directory. Furthermore, all documentations are placed in the `pages/docs` subdirectory, so it is accessible with Next.js routing as `domain/docs/...`.

### docs

This is where the documentation pages are stored.