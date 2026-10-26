





cd whatsapp-module-frontend



Okay, let's create detailed documentation for the "WhatsApp Business Integration" remote module. This documentation will cover its purpose, frontend components, backend interactions, and how it fits into your overall platform architecture.

---

## WhatsApp Business Integration Module Documentation

**Version:** 1.0.0 (Example)
**Module ID (Internal):** `whatsapp-business`
**Federated Name (for MF):** `whatsapp_app`

### 1. Overview

The WhatsApp Business Integration Module allows organizations within the platform to connect their official WhatsApp Business API (Meta Cloud API) accounts. Once connected, organizations can manage these channels, and the platform can facilitate sending and receiving WhatsApp messages through the central `ConversationsPage`. This module is essential for enabling WhatsApp as a communication channel within the omnichannel CRM.

**Key Goals:**

*   Allow administrators to securely configure one or more WhatsApp Business API channels.
*   Provide the necessary backend infrastructure to receive incoming WhatsApp messages and message status updates via webhooks.
*   Enable the platform's core messaging services to send outgoing messages through the configured WhatsApp channels.
*   (Future) Expose WhatsApp-specific UI elements or actions within the main platform's chat interface (e.g., template pickers, WhatsApp profile information).

### 2. Architecture & Placement

This module is designed as a **Module Federation Remote**.

*   **Frontend Remote (`whatsapp_app`):** A separate Vite/React application that exposes specific UI components (primarily settings pages for now). It runs on its own development server (e.g., `http://localhost:5001`) and is built independently. In production, its assets (`remoteEntry.js`, chunks) are deployed to a CDN or served by the platform.
*   **Backend Components:** The backend logic for this module resides within the main platform's backend server but is logically separated (e.g., in an `src/integrations/whatsapp/` directory). This includes:
    *   API endpoints for managing WhatsApp channel configurations.
    *   Webhook handlers for Meta Cloud API.
    *   Service functions to interact with the Meta Cloud API for sending messages.

**Connection to Host Platform:**

*   **Frontend:** The `platform-host` (main frontend application) dynamically loads UI components from the `whatsapp_app` remote using Module Federation. This is configured via the host's `vite.config.js` (in the `remotes` section) and the remote's `vite.config.js` (in the `exposes` section).
*   **Backend:**
    *   The remote's frontend components (e.g., `WhatsAppChannelSettingsPage`) make API calls to the **platform's core backend API endpoints** (e.g., `/api/integrations/whatsapp/channels`).
    *   The platform's core backend services (e.g., `conversation.service.js`) call specialized service functions within the WhatsApp integration logic (e.g., `sendWhatsAppMessageViaProvider`) to interact with the Meta API.

### 3. Frontend Components (Exposed by `whatsapp_app` Remote)

#### 3.1. `WhatsAppChannelSettingsPage.jsx`

*   **Path in Host:** Loaded when the host navigates to a path defined in the `Module` table for `whatsapp-business` under `uiComponents.settings.path` (e.g., `/settings/integrations/whatsapp`).
*   **Purpose:** Allows organization administrators to manage their WhatsApp Business API channel configurations.
*   **Key Functionalities:**
    1.  **List Configured Channels:**
        *   On mount, fetches existing WhatsApp channels for the current user's organization.
        *   **API Call:** `GET /api/integrations/whatsapp/channels` (to the platform backend).
        *   Displays each channel's name, phone number, provider (Meta Cloud API), and activation status (`isActive`).
    2.  **Add New Channel:**
        *   Opens a modal (`ChannelFormModal`).
        *   Form collects:
            *   `channelName`: User-friendly display name.
            *   `phoneNumber`: The E.164 formatted WhatsApp Business number.
            *   `provider`: Fixed to `meta_cloud_api`.
            *   `metaPhoneNumberId`: From Meta Developer Dashboard.
            *   `metaBusinessAccountId`: WABA ID from Meta Developer Dashboard.
            *   `metaAccessToken`: System User Access Token (long-lived). User is warned about security.
            *   `webhookVerificationToken`: A strong token defined by the admin, to be entered into the Meta App Dashboard for webhook setup.
        *   Displays the required **Webhook URL** for the admin to copy into their Meta App settings (e.g., `https://YOUR_PLATFORM_DOMAIN.com/webhooks/whatsapp`).
        *   **API Call:** `POST /api/integrations/whatsapp/channels` with the form data.
    3.  **Edit Existing Channel:**
        *   Opens `ChannelFormModal` pre-filled with channel data (Access Token field is typically blank for editing for security).
        *   **API Call:** `PUT /api/integrations/whatsapp/channels/:channelId` with updated data.
    4.  **Delete Channel:**
        *   Prompts for confirmation.
        *   **API Call:** `DELETE /api/integrations/whatsapp/channels/:channelId`.
    5.  **Activate/Deactivate Channel:**
        *   Toggles the `isActive` status of a channel.
        *   **API Call:** `PUT /api/integrations/whatsapp/channels/:channelId` with `{ isActive: true/false }`.
        *   UI should remind admin that a channel should only be activated after the webhook is successfully verified in the Meta App Dashboard.
*   **Shared Dependencies Used:**
    *   `axios` (from host): For making API calls. The instance should be pre-configured by the host with `baseURL` and auth interceptors.
    *   `useAuthStore` (from host): To get the current `user` object, primarily for `organizationId` to ensure API calls are correctly scoped if the backend doesn't infer it solely from the JWT. (Note: API calls made with the shared `axios` from host will have the JWT automatically attached, so backend can get `req.user.organizationId`).
    *   `react-hot-toast` (from host): For displaying success/error notifications.
    *   `@heroicons/react`: For icons (this remote has its own dependency).

#### 3.2. (Future) `WhatsAppDashboardPage.jsx`

*   **Path in Host:** Loaded when the host navigates to path defined in `Module` table `uiComponents.page.path` (e.g., `/integrations/whatsapp`).
*   **Purpose:** An overview page for the WhatsApp integration, showing stats, recent activity, quick links to settings, or template management.
*   **API Calls:** Would fetch WhatsApp-specific analytics or summaries from dedicated backend endpoints.

#### 3.3. (Future) Chat-Specific UI Injections (e.g., `WhatsAppTemplateSelector.jsx`)

*   **Loaded by:** `ChatDetailsSidebar` in the host platform when `activeConversation.sourceChannel === 'whatsapp'`.
*   **Purpose:** Provide UI to select and send approved WhatsApp Message Templates.
*   **API Calls:**
    *   `GET /api/integrations/whatsapp/templates?channelId=X`: To fetch available templates for the active channel.
    *   Would then use the platform's `POST /api/conversations/:id/messages` endpoint, but with `messageType: 'template'` and the appropriate `options` payload.

### 4. Backend Components (Part of the Main Platform Backend)

Located in, for example, `src/integrations/whatsapp/`.

#### 4.1. `WhatsAppChannel` Database Table

*   **Purpose:** Securely stores configuration details for each WhatsApp Business API channel linked by an organization.
*   **Key Fields:** `organizationId`, `channelName`, `phoneNumber`, `provider ('meta_cloud_api')`, `metaPhoneNumberId`, `metaBusinessAccountId`, `metaAccessToken` (encrypted at rest in production), `webhookVerificationToken`, `isActive`.

#### 4.2. `whatsapp.channel.service.js`

*   **Purpose:** Business logic for managing `WhatsAppChannel` records.
*   **Functions:**
    *   `createWhatsAppChannel(organizationId, data)`: Inserts a new channel config.
    *   `listWhatsAppChannels(organizationId)`: Fetches all channels for an org.
    *   `getWhatsAppChannelById(channelId, organizationId)`: Fetches a specific channel.
    *   `updateWhatsAppChannel(channelId, organizationId, updateData)`: Updates a channel.
    *   `deleteWhatsAppChannel(channelId, organizationId)`: Deletes a channel.
    *   `getActiveChannelForSending(organizationId, fromPhoneNumber)`: Finds an active channel for the org, optionally matching a specific sending number. Used by outgoing message logic.
    *   `getChannelByMetaPhoneNumberId(metaPhoneNumberId)`: Used by webhook to identify which channel config an incoming message pertains to.

#### 4.3. `whatsapp.channel.controller.js` & `whatsapp.channel.routes.js`

*   **Purpose:** Expose CRUD API endpoints for managing `WhatsAppChannel` configurations. These are called by the remote `WhatsAppChannelSettingsPage.jsx`.
*   **Routes:**
    *   `POST /api/integrations/whatsapp/channels`
    *   `GET /api/integrations/whatsapp/channels`
    *   `GET /api/integrations/whatsapp/channels/:channelId`
    *   `PUT /api/integrations/whatsapp/channels/:channelId`
    *   `DELETE /api/integrations/whatsapp/channels/:channelId`
*   **Protection:** These routes are protected by `isAuthenticated` and specific permissions (e.g., `whatsapp:manage_channels`).

#### 4.4. `whatsapp.webhook.service.js`

*   **`sendWhatsAppMessageViaProvider(organizationId, toWhatsAppNumber, fromWhatsAppNumberConfigured, messageContent, messageType, options)`:**
    1.  Uses `channelConfigService.getActiveChannelForSending` to get the `metaPhoneNumberId` and `metaAccessToken` for the `organizationId` and `fromWhatsAppNumberConfigured`.
    2.  Constructs the appropriate JSON payload for the Meta Cloud API based on `messageType` (text, template, image, etc.) and `options`.
    3.  Makes an `axios.post` call to `https://graph.facebook.com/vXX.X/YOUR_PHONE_NUMBER_ID/messages` with the Bearer token.
    4.  Returns `{ success, channelMessageId, status, error, errorCode }`.
*   **`processIncomingWhatsAppMessage(organizationId, metaEntryChangeValue, yourBusinessDisplayPhoneNumber, yourBusinessMetaPhoneNumberId)`:**
    1.  **Parses `metaEntryChangeValue`:** Extracts sender WA ID (`message.from`), your business's WA phone number ID (`value.metadata.phone_number_id`), message content, type, WAMID (`message.id`), timestamp.
    2.  **Find/Create `Client`:** Calls `clientService.findOrCreateClient` using `organizationId` and sender's WA ID.
    3.  **Find/Create `Conversation`:**
        *   Looks for an existing, recent, open WhatsApp conversation for that client and *your specific business phone number ID* (`externalChannelConversationId`).
        *   If none, calls `conversationService.createConversation`, passing client/org IDs, `sourceChannel: 'whatsapp'`, `whatsappSenderIdSnapshot`, `externalChannelConversationId` (set to *your* business's Meta Phone Number ID), and the first message as `initialMessageData`.
    4.  **Save `Message` (Idempotency):**
        *   Checks if a `Message` with the incoming WAMID (`channelMessageId`) already exists to prevent duplicates.
        *   If not a duplicate, calls `conversationService.addMessageToConversation` to save the client's message. This service itself should *not* try to send this client message back out.
    5.  **Process Status Updates:** If the webhook payload is a status update (`value.statuses`), calls `messageService.updateMessageStatusByChannelId` to update the corresponding message in your DB.
    6.  Returns an object indicating what was processed (e.g., `{ newMessage, conversationId, newConversation, messageStatusUpdated, updatedMessage }`).

#### 4.5. `whatsapp.webhook.controller.js` & `whatsapp.webhook.routes.js`

*   **Purpose:** Handles incoming HTTP requests from Meta Cloud API.
*   **Routes:**
    *   `GET /webhooks/whatsapp`: For Meta's initial webhook URL verification (checks `hub.mode`, `hub.verify_token`, responds with `hub.challenge`). Uses `META_WEBHOOK_VERIFY_TOKEN` from `.env`.
    *   `POST /webhooks/whatsapp`: Receives actual messages and status updates.
*   **`handleIncomingMetaWebhook` Controller Function:**
    1.  **(Production Crucial) Verify Meta Signature:** Validates the `X-Hub-Signature-256` header using your Meta App Secret to ensure the request is genuinely from Meta.
    2.  Parses the JSON payload.
    3.  Identifies which of *your* configured WhatsApp Business Phone Number IDs (`value.metadata.phone_number_id`) received the event.
    4.  Uses this ID to fetch the corresponding `WhatsAppChannel` record from your DB (to get `organizationId` and potentially other channel-specific settings).
    5.  Calls `webhookService.processIncomingWhatsAppMessage` or `processIncomingWhatsAppStatusUpdate`.
    6.  Emits appropriate Socket.IO events via `req.app.get('socketio')` (e.g., `new_message`, `message_status_updated`) to relevant rooms (e.g., `conversation_XYZ`, `agent_ABC`).
    7.  Responds to Meta with a `200 OK` status code **quickly**.

### 5. Connection Between Platform Core and WhatsApp Module

*   **Agent Sends Message (Platform -> WA Module -> Meta):**
    1.  Agent types in `ConversationsPage` (Host UI).
    2.  `handleSendMessage` calls `POST /api/conversations/:id/messages` (Platform API).
    3.  `conversation.controller.js` calls `conversation.service.js -> addMessageToConversation`.
    4.  `addMessageToConversation`:
        *   Saves message to DB with `status: 'pending_send'`.
        *   Determines the conversation is via `'whatsapp'`.
        *   Fetches the `Client`'s `whatsappSenderId` (recipient).
        *   Calls `whatsapp.webhook.service.js -> sendWhatsAppMessageViaProvider`, passing org ID, recipient, *your configured sending WA number for that org*, message content.
        *   `sendWhatsAppMessageViaProvider` gets Meta credentials from `WhatsAppChannel` table (via `whatsapp.channel.service.js`) and calls Meta API.
        *   Updates DB message with WAMID and `status: 'sent_to_channel'`.
        *   Service emits `new_message` and `message_status_updated` via Socket.IO.

*   **Client Sends Message (Meta -> WA Module -> Platform):**
    1.  Client sends WA message.
    2.  Meta sends webhook to `/webhooks/whatsapp` (WA Module Backend Logic).
    3.  `whatsapp.webhook.controller.js -> handleIncomingMetaWebhook` verifies and processes.
    4.  `whatsapp.webhook.service.js -> processIncomingWhatsAppMessage`:
        *   Identifies your `organizationId` (from `value.metadata.phone_number_id` mapping to `WhatsAppChannel` table).
        *   Calls platform's `clientService.findOrCreateClient`.
        *   Calls platform's `conversationService.createConversation` or finds existing.
        *   Calls platform's `conversationService.addMessageToConversation` to save the message.
        *   Controller emits `new_message` via Socket.IO.

This detailed flow illustrates the separation of concerns: the WhatsApp module handles WhatsApp-specific API interactions and webhook processing, while the platform provides the core CRM data storage, generic conversation management, and the UI shell. Shared services (`clientService`, `conversationService`) are used by the WhatsApp integration logic.












