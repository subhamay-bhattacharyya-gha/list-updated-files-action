# 🔍 Detect Changed Files

![Release](https://github.com/subhamay-bhattacharyya-gha/list-updated-files-action/actions/workflows/release.yaml/badge.svg)&nbsp;![Commit activity](https://img.shields.io/github/commit-activity/t/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Last commit](https://img.shields.io/github/last-commit/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Release date](https://img.shields.io/github/release-date/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Repo size](https://img.shields.io/github/repo-size/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Directory file count](https://img.shields.io/github/directory-file-count/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Issues](https://img.shields.io/github/issues/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Top language](https://img.shields.io/github/languages/top/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Monthly commit activity](https://img.shields.io/github/commit-activity/m/subhamay-bhattacharyya-gha/list-updated-files-action)&nbsp;![Custom endpoint](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/bsubhamay/0ad4bc14464d4f48af6c71f1681035b6/raw/list-updated-files-action.json?)

A GitHub Composite Action that detects added, modified, and deleted files compared to the default branch and outputs the result as a categorized JSON object. It also prints a Markdown table with emoji-enhanced summary in the GitHub Actions summary view.

---

## 📦 Features

- Compares working branch against the default branch
- Categorizes files as ➕ Added, 📝 Modified, or ❌ Deleted
- Outputs changes as a structured JSON and CSV string
- Prints a Markdown summary table with counts and emojis
- Uses `bash`, `awk`, and `jq` for efficient processing

---

## 🧰 Inputs

This composite action currently takes no inputs.

---

## 📤 Outputs

| Name           | Description                                        |
|----------------|----------------------------------------------------|
| `files-changed`| Comma-separated list of all changed file paths     |
| `json-output`  | Path to a JSON file containing grouped change sets |
|  `has-changes` | Boolean indicator if any files were changed        |

---

## 🚀 Usage

### Basic Example

```yaml
name: Detect Changes

on:
  push:
    branches:
      - main

jobs:
  detect-changes:
    runs-on: ubuntu-latest

    steps:
      - name: Detect repository changes
        id: detect
        uses: subhamay-bhattacharyya-gha/list-updated-files-action@main

      - name: Print outputs
        run: |
          echo "Files changed: ${{ steps.detect.outputs.files-changed }}"
          cat ${{ steps.detect.outputs.json-output }}
```

---

## 🧪 Output Example

**`json-output`** file:

```json
{
  "A": ["src/new-file.ts"],
  "M": ["src/updated-file.ts"],
  "D": ["src/old-file.ts"]
}
```

**Markdown Summary in GitHub UI:**

| Status   | File             |
|----------|------------------|
| ➕ Added    | src/new-file.ts    |
| 📝 Modified | src/updated-file.ts |
| ❌ Deleted  | src/old-file.ts     |

**Summary:**

- 🟢 Added: 1
- 🟡 Modified: 1
- 🔴 Deleted: 1

---

## 📁 Repository Structure

```text
.
├── .github/actions/detect-changes/action.yml  # Composite action definition
├── README.md                                  # You're reading it!
```

---

## 🧼 Notes

- Requires no external dependencies other than bash, awk, and jq
- Supports shallow clone detection via fetch-depth handling
- Automatically prints a detailed and human-friendly summary

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
