<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Git Safety Rules (Do Not Violate)

- Never run destructive git commands unless the user explicitly approves that exact command in the immediately preceding message.
- Treat these as destructive and blocked by default:
  - `git reset --hard`
  - `git checkout -- <path>`
  - `git restore --source ... --worktree --staged ...`
  - `git clean -fd` / `git clean -fdx`
  - any command that discards uncommitted work or rewrites history
- If user asks to "revert", "undo", or "reset", ask which safe method they want before running git commands.
- Prefer safe alternatives first:
  - edit files directly
  - `git restore <path>` only with explicit approval
  - create a new commit that reverts prior committed changes
- Before any potentially destructive action, explain exactly what data may be lost and wait for confirmation.

## File Deletion Safety Rules (Do Not Violate)

- Never delete files or directories unless the user explicitly approves deletion in the immediately preceding message.
- If deletion is requested broadly (for example, "clean up" or "remove old files"), list the exact paths first and ask for confirmation before deleting anything.
- Prefer non-destructive alternatives first:
  - keep file and deprecate it
  - rename or move file
  - comment out usage and leave file in place
- Before deleting, explain what will be removed and what behavior may be affected.
