# Git Immersion Labs

These are the labs for the Git Immersion training, a series of
self-paced exercises that take you through the basics of using git.

## Online

You can find the labs online at
[http://gitimmersion.com](http://gitimmersion.com).

## Building the Labs

The labs are generated from a single source file that describes
each of the labs.  The generation is done in two steps.

Before running the labs, make sure you have the following alias
in your .gitconfig file.  The `hist` command is used extensively
throughout the tutorial.

    [alias]
      hist = log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short

First, the `rake run` command runs through each of the labs and
executes the listed commands and captures the output.  The `auto`
directory is used for the automatic running and the output is captured
in the `samples` directory.

Second, the `rake labs` command generates the HTML labs using the text
from the `src/labs.txt` file and the captured live output from the
`samples` directory.  Template files for the main index, the lab
pages, and the navigation divs can be found in the `templates`
directory.

The HTML output is put into `git_tutorial/html`.  Browsing the
`git_tutorial/html/index.html` file will bring up the git tutorial in
your browser.

## Publishing the Labs

To publish the labs on the web-site, run the `rake publish` command.
This will copy the `git_tutorial/html` directory to the `gh-pages`
branch. The `gh-pages` branch is then pushed, which auto-publishes it
from github.

Manually modifying the files in the `gh-pages` branch is probably the
wrong thing to do.  Modify the appropriate template or css file on the
master branch, then run `rake publish`.

## Lab Format Directives

The `labs.txt` file contains all the lab text, formatted as a text
file with additional directives interpreted for both run time
(generating the sample output) and format time (generating the HTML).

The Format Directives are:

### h1. _\<lab name\>_

Starts a new lab with the name _\<lab name\>_.  Each lab

Example:

    h1. Using Revert

### pre(_\<class name\>_).

A section of predefined code, using the HTML class of _\<class
name\>_.  The predefined code block runs until a blank line.

Example:

    pre(instructions).
    git log --pretty=oneline --max-count=2
    git log --pretty=oneline --since='5 minutes ago'
    git log --pretty=oneline --until='5 minutes ago'

The *instructions* class is used to format command similar to the
execute section, but without executing the commands in the run phase.

### p. _\<text...\>_

A paragraph of text.  The text for the paragraph will continue on
following lines until a blank line.

Example:

    p. If you have never used git before, you need to do some setup
    first.  Run the following commands so that git knows your name and
    email.  If you have git already setup, you can skip down to the
    line ending section.

### Execute:

Execute the following shell command until a blank line is encountered.
Commands are executed as they appear with the following exceptions.

* +_\<command line\>_

  Run this _\<command\>_ line silently, do not include it on the lab
  output.

* -_\<command line\>_

  Do not run this _\<command line\>_, but include it in the lab
  output.

* =*\<sample_name\>*

For example, the following will execute the `git status` command and
capture its output in the `status` sample for the lab.  The first `git
commit` is ignored at runtime (but will be included in lab output).
The second `git commit` with a commit message will be executed (but
will not appear in the lab output).  However, the output of the second
command is captured in a sample.

    Execute:
    git status
    =status
    -git commit
    +git commit -m 'Using ARGV'
    =commit

### File: _\<filename\>_

Format the following lines (until an "EOF" string is encountered) as
the contents of a file name _\<filename\>_.

Example:

    File: hello.rb
    # This is the hello world program in Ruby.

    puts "Hello, World!"
    EOF

### Output:

Format the following line.  (until an "EOF" string is encountered) as
the output of commands.

Output lines starting with = are used to grab the sample files
generated during the run phase.

Example:

    Output:
    git commit
    Waiting for Emacs...
    [master 569aa96] Using ARGV
     1 files changed, 1 insertions(+), 1 deletions(-)
    EOF

Often sample lines are included in the output.  Assuming you have
captured the output of a status command and a commit command, you
might use the following:

    Output:
    =status
    =commit
    EOF

### Set: _\<keyword\>_=_\<ruby expression\>_

Evaluate the _\<ruby expression\>_ and set the _\<keyword\>_ to that
value.  Often used to grab dynamic data from the run phase for use in
later commands.

For example, the following will grab the git hash value for the commit
labeled "First Commit", and store it in _\<hash\>_.  When the `git
checkout` command is executed, it uses the value of _\<hash\>_ in the
command.

    Set: hash=hash_for("First Commit")
    Execute:
    git checkout <hash>

### =_\<sample name\>_

Define/use a sample output.

Sample output are generated during the run phase of building the Git
Immersion labs.  They are the output of a single command line in the
Execute section of a lab.

Example:

    Execute:
    git checkout master
    =checkout
    git status
    =status

The two sample lines above capture the output from the checkout and
status git commands respectively.  The sample output is saved (in the
`samples` directory) until the HTML generation phase is performed.

During HTML generation, the sample lines may be "played back" by
including them in the Output section of a lab.

Example:

    Output:
    =checkout
    =status
    EOF

Sample names must be unique within a single lab, but do not have to be
unique across the entire project.

# License

![CC by-nc-sa](http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)

GitImmersion is released under a
[Creative Commons, Attribution-NonCommercial-ShareAlike, Version 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/)
License.
