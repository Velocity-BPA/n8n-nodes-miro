# n8n-nodes-miro

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Miro's REST API v2, enabling full whiteboard automation capabilities. This node allows you to programmatically manage boards, create and manipulate board items (sticky notes, shapes, cards, frames, images, connectors), manage collaborators, and integrate Miro with your existing workflows.

![n8n](https://img.shields.io/badge/n8n-community--node-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **12 Resource Categories** covering all major Miro API capabilities
- **60+ Operations** for comprehensive whiteboard automation
- **OAuth 2.0 Authentication** with automatic token refresh
- **Cursor-Based Pagination** for efficient data retrieval
- **Rate Limiting** with exponential backoff
- **Full CRUD Operations** for boards, items, and collaborators
- **Visual Elements** - sticky notes, shapes, cards, frames, connectors, images, text
- **Collaboration Tools** - board sharing, member management, tags

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-miro`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-miro
```

### Development Installation

```bash
# 1. Extract the zip file
unzip n8n-nodes-miro.zip
cd n8n-nodes-miro

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Create symlink to n8n custom nodes directory
# For Linux/macOS:
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-miro

# For Windows (run as Administrator):
# mklink /D %USERPROFILE%\.n8n\custom\n8n-nodes-miro %CD%

# 5. Restart n8n
n8n start
```

## Credentials Setup

### Miro OAuth2 API

| Property | Description |
|----------|-------------|
| **Client ID** | Your Miro app's client ID from the [Miro Developer Portal](https://miro.com/app-dashboard) |
| **Client Secret** | Your Miro app's client secret |
| **Scopes** | Default: `boards:read boards:write` |

### Setting Up Miro App

1. Go to [Miro Developer Portal](https://miro.com/app-dashboard)
2. Click **Create new app**
3. Fill in the app details
4. Under **Redirect URI**, add your n8n OAuth callback URL (e.g., `https://your-n8n-instance.com/rest/oauth2-credential/callback`)
5. Under **Permissions**, enable the required scopes:
   - `boards:read` - Read board data
   - `boards:write` - Create and modify boards
6. Copy the **Client ID** and **Client Secret** to your n8n credentials

## Resources & Operations

### Board
| Operation | Description |
|-----------|-------------|
| Create | Create a new Miro board |
| Get | Retrieve a specific board |
| Get All | List all accessible boards |
| Update | Update board settings |
| Delete | Delete a board |
| Copy | Duplicate a board |

### Board Member
| Operation | Description |
|-----------|-------------|
| Share | Invite a user to a board |
| Get | Get specific board member |
| Get All | List all board members |
| Update | Change member role |
| Remove | Remove member from board |

### Item (Generic)
| Operation | Description |
|-----------|-------------|
| Get | Get any item by ID |
| Get All | List all items on a board |
| Update Position | Move item to new position |
| Delete | Delete any item |

### Sticky Note
| Operation | Description |
|-----------|-------------|
| Create | Create a sticky note |
| Get | Get sticky note details |
| Update | Update sticky note content/style |
| Delete | Delete a sticky note |

**Sticky Note Colors:** gray, light_yellow, yellow, orange, light_green, green, dark_green, cyan, light_pink, pink, violet, red, light_blue, blue, dark_blue, black

### Shape
| Operation | Description |
|-----------|-------------|
| Create | Create a shape |
| Get | Get shape details |
| Update | Update shape content/style |
| Delete | Delete a shape |

**Shape Types:** rectangle, round_rectangle, circle, triangle, rhombus, parallelogram, trapezoid, pentagon, hexagon, octagon, wedge_round_rectangle_callout, star, flow_chart_predefined_process, cloud, cross, can, right_arrow, left_arrow, left_right_arrow, left_brace, right_brace

### Card
| Operation | Description |
|-----------|-------------|
| Create | Create a card with title, description, due date, assignee |
| Get | Get card details |
| Update | Update card properties |
| Delete | Delete a card |

**Card Themes:** yellow, green, blue, red, light_green, light_pink, light_yellow, magenta, cyan, gray, violet, black

### Frame
| Operation | Description |
|-----------|-------------|
| Create | Create a frame container |
| Get | Get frame details |
| Get Items | List items inside frame |
| Update | Update frame properties |
| Delete | Delete a frame |

**Frame Formats:** custom, a4, letter, desktop, tablet, phone

### Connector
| Operation | Description |
|-----------|-------------|
| Create | Create a connector between items |
| Get | Get connector details |
| Get All | List all connectors |
| Update | Update connector properties |
| Delete | Delete a connector |

**Connector Shapes:** straight, elbowed, curved

**Cap Styles:** none, arrow, stealth, filled_triangle, triangle, filled_diamond, diamond, filled_oval, oval, erd_one, erd_many, erd_one_or_many, erd_only_one, erd_zero_or_many, erd_zero_or_one

### Image
| Operation | Description |
|-----------|-------------|
| Create from URL | Add an image from URL |
| Get | Get image details |
| Update from URL | Replace image from URL |
| Delete | Delete an image |

### Text
| Operation | Description |
|-----------|-------------|
| Create | Create a text item |
| Get | Get text details |
| Update | Update text content/style |
| Delete | Delete a text item |

**Supported HTML:** `<p>`, `<a>`, `<strong>`, `<em>`, `<u>`, `<s>`

### Tag
| Operation | Description |
|-----------|-------------|
| Create | Create a tag |
| Get | Get tag details |
| Get All | List all board tags |
| Update | Update tag properties |
| Delete | Delete a tag |
| Attach to Item | Add tag to an item |
| Remove from Item | Remove tag from item |
| Get Item Tags | List tags on an item |
| Get Items by Tag | List items with a tag |

**Tag Colors:** red, light_green, cyan, yellow, magenta, green, blue, gray, violet, dark_green, dark_blue, black

### Document
| Operation | Description |
|-----------|-------------|
| Create from URL | Embed a document from URL |
| Get | Get document details |
| Update from URL | Replace document from URL |
| Delete | Delete a document |

## Usage Examples

### Create a Board with Sticky Notes

```json
{
  "nodes": [
    {
      "name": "Create Board",
      "type": "n8n-nodes-miro.miro",
      "parameters": {
        "resource": "board",
        "operation": "create",
        "name": "Sprint Planning"
      }
    },
    {
      "name": "Add Sticky Note",
      "type": "n8n-nodes-miro.miro",
      "parameters": {
        "resource": "stickyNote",
        "operation": "create",
        "boardId": "={{ $json.id }}",
        "content": "Task 1: Design Review",
        "fillColor": "light_yellow"
      }
    }
  ]
}
```

### Bulk Create Items from Data

```json
{
  "name": "Create Cards",
  "type": "n8n-nodes-miro.miro",
  "parameters": {
    "resource": "card",
    "operation": "create",
    "boardId": "your-board-id",
    "title": "={{ $json.taskName }}",
    "description": "={{ $json.taskDescription }}",
    "dueDate": "={{ $json.deadline }}"
  }
}
```

### Connect Items with Arrows

```json
{
  "name": "Create Connector",
  "type": "n8n-nodes-miro.miro",
  "parameters": {
    "resource": "connector",
    "operation": "create",
    "boardId": "your-board-id",
    "startItemId": "start-item-id",
    "endItemId": "end-item-id",
    "shape": "elbowed",
    "startStrokeCap": "none",
    "endStrokeCap": "arrow"
  }
}
```

## Miro Concepts

### Board Coordinates
- Origin is at the center of the board (0, 0)
- X increases to the right
- Y increases downward
- All positions are in pixels

### Item Hierarchy
- **Frames** can contain other items as children
- Items can be nested by setting a `parent` reference
- Connectors link items but aren't contained within them

### Collaboration
- **Roles**: viewer, commenter, editor, coowner, owner
- Share via email or team
- Manage permissions at board level

## Error Handling

The node handles common Miro API errors:

| Error Code | Description |
|------------|-------------|
| 400 | Invalid request - check parameters |
| 401 | Authentication failed - refresh credentials |
| 403 | Insufficient permissions - check scopes |
| 404 | Resource not found |
| 409 | Conflict - resource already exists |
| 429 | Rate limited - automatic retry with backoff |

## Rate Limiting

Miro implements plan-based rate limiting (typically 1000-10000 requests/hour). This node includes:

- Automatic retry with exponential backoff on 429 errors
- Initial delay: 1 second
- Maximum delay: 60 seconds
- Maximum retries: 5

## Security Best Practices

1. **Secure Credentials**: Store OAuth credentials securely in n8n's credential manager
2. **Minimal Scopes**: Request only the scopes your workflow needs
3. **Token Refresh**: Use expiring tokens for better security
4. **Board Permissions**: Use appropriate sharing levels (viewer vs editor)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

- [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-miro/issues)
- [Miro API Documentation](https://developers.miro.com/reference)
- [n8n Community](https://community.n8n.io)

## Acknowledgments

- [Miro](https://miro.com) for their comprehensive REST API
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for feedback and contributions
