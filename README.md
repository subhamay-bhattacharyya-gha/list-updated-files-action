# 🔍 Detect Modified Files

![Commit activity](https://img.shields.io/github/commit-activity/t/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Last commit](https://img.shields.io/github/last-commit/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Release date](https://img.shields.io/github/release-date/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Repo size](https://img.shields.io/github/repo-size/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Directory file count](https://img.shields.io/github/directory-file-count/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Issues](https://img.shields.io/github/issues/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Top language](https://img.shields.io/github/languages/top/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Monthly commit activity](https://img.shields.io/github/commit-activity/m/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Custom endpoint](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/bsubhamay/0ad4bc14464d4f48af6c71f1681035b6/raw/list-updated-files-action.json?)

A GitHub Action that detects files modified since a specified Git reference and outputs the result as a JSON array.
Useful for conditional workflows, selective deployment, or auditing code changes between commits.

---

## 📦 Features

- Uses Git to detect modified files compared to a provided ref (default: `HEAD^`)
- Outputs modified files as a JSON array to be used in subsequent workflow steps
- Written as a JavaScript-based custom action using `node20` runtime

---

## 🧰 Inputs

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `ref` | Git reference to compare against (e.g., `HEAD^`, `main`, or a commit SHA) | ❌ | `HEAD^` |

---

## 📤 Outputs

| Name             | Description                               |
|------------------|-------------------------------------------|
| `modified_files` | A JSON array of file paths that were modified since the specified ref |

---

## 🚀 Usage

### Basic Example

```yaml
name: Detect Modified Files

on:
  push:
    branches:
      - main

jobs:
  detect-changes:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Detect modified files
        id: detect
        uses: your-org/detect-modified-files-action@v1
        with:
          ref: HEAD^  # optional; defaults to HEAD^

      - name: Display modified files
        run: |
          echo "Modified files:"
          echo "${{ steps.detect.outputs.modified_files }}"
```

---

## 🧪 Output Example

The output will be a JSON array string:

```json
["src/index.js", "README.md", "workflow/build.yaml"]
```

You can consume it using matrix strategies or parse it in shell scripts as needed.

---

## 🛠 Development

### Local Setup

To install dependencies:

```bash
npm install
```

### To Run Locally

Ensure you're in a Git repository and have at least one commit:

```bash
node main.js
```

---

## 📁 Repository Structure

```
.
├── action.yaml        # Metadata for the GitHub Action
├── main.js            # Action logic
├── package.json       # Node.js dependencies
├── README.md          # You're reading it!
```

---

## 🧼 Notes

- Requires Node.js `>=18` to run locally (matches GitHub runner environment).
- This action does not push or comment — it only returns the list of modified files.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
