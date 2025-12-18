describe('ChatComponent', () => {
  // ...existing code...

  describe('callbacks', () => {
    it('should trigger onMessageSent callback when a message is sent', () => {
      const onMessageSent = vi.fn();
      const { getByPlaceholderText, getByText } = render(
        <ChatComponent onMessageSent={onMessageSent} />
      );

      const textarea = getByPlaceholderText(/type your message/i);
      const sendButton = getByText('Send');

      fireEvent.change(textarea, { target: { value: 'Test message' } });
      fireEvent.click(sendButton);

      expect(onMessageSent).toHaveBeenCalledTimes(1);
      expect(onMessageSent).toHaveBeenCalledWith(
        expect.objectContaining({
          conversationId: expect.any(Number),
          message: expect.objectContaining({
            text: 'Test message',
            id: expect.any(Number),
            timestamp: expect.any(Number)
          })
        })
      );
    });

    it('should trigger onConversationOpened callback when selecting a conversation', () => {
      const onConversationOpened = vi.fn();
      const initialData = [
        { id: 1, title: 'Conversation 1', messages: [], open: true },
        { id: 2, title: 'Conversation 2', messages: [], open: true }
      ];

      const { getByText } = render(
        <ChatComponent
          initialData={initialData}
          onConversationOpened={onConversationOpened}
        />
      );

      const conversation = getByText('Conversation 2');
      fireEvent.click(conversation);

      expect(onConversationOpened).toHaveBeenCalledTimes(1);
      expect(onConversationOpened).toHaveBeenCalledWith(
        expect.objectContaining({
          conversationId: 2,
          conversation: expect.objectContaining({
            id: 2,
            title: 'Conversation 2'
          })
        })
      );
    });

    it('should trigger onConversationCreated callback when creating a conversation', () => {
      const onConversationCreated = vi.fn();
      const { getByText, getByPlaceholderText } = render(
        <ChatComponent onConversationCreated={onConversationCreated} />
      );

      const newButton = getByText('+ New');
      fireEvent.click(newButton);

      const titleInput = getByPlaceholderText(/e.g., General Question/i);
      fireEvent.change(titleInput, { target: { value: 'New Test Conversation' } });

      const createButton = getByText('Create');
      fireEvent.click(createButton);

      expect(onConversationCreated).toHaveBeenCalledTimes(1);
      expect(onConversationCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          conversationId: expect.any(Number),
          conversation: expect.objectContaining({
            title: 'New Test Conversation'
          })
        })
      );
    });
  });

  describe('read-only mode', () => {
    it('should render in read-only mode with conversation prop', () => {
      const conversation = {
        id: 1,
        title: 'Read-Only Conversation',
        messages: [
          { id: 1, text: 'Hello', timestamp: Date.now(), senderId: 'user1' },
          { id: 2, text: 'Hi there', timestamp: Date.now(), senderId: 'user2' }
        ]
      };

      const { getByText, queryByPlaceholderText, queryByText } = render(
        <ChatComponent
          readOnly={true}
          conversation={conversation}
          currentUserId="user1"
        />
      );

      expect(getByText('Read-Only Conversation')).toBeInTheDocument();
      expect(getByText('Hello')).toBeInTheDocument();
      expect(getByText('Hi there')).toBeInTheDocument();
      expect(queryByPlaceholderText(/type your message/i)).not.toBeInTheDocument();
      expect(queryByText('+ New')).not.toBeInTheDocument();
    });
  });

  describe('UI control props', () => {
    it('should hide New button when hideNewButton is true', () => {
      const { queryByText } = render(
        <ChatComponent hideNewButton={true} />
      );

      expect(queryByText('+ New')).not.toBeInTheDocument();
    });

    it('should hide toggle button when hideToggleButton is true', () => {
      const { queryByLabelText } = render(
        <ChatComponent hideToggleButton={true} />
      );

      expect(queryByLabelText('Open conversations')).not.toBeInTheDocument();
    });
  });

  describe('closed conversation behavior', () => {
    it('should disable compose area when conversation is closed and disableClosedConversations is true', () => {
      const initialData = [
        {
          id: 1,
          title: 'Closed Conversation',
          messages: [],
          open: false,
          status: 'closed'
        }
      ];

      const { getByPlaceholderText } = render(
        <ChatComponent
          initialData={initialData}
          initialActiveConversationId={1}
          disableClosedConversations={true}
        />
      );

      const textarea = getByPlaceholderText(/this conversation is closed/i);
      expect(textarea).toBeDisabled();
    });

    it('should enable compose area when conversation is open even with disableClosedConversations', () => {
      const initialData = [
        {
          id: 1,
          title: 'Open Conversation',
          messages: [],
          open: true,
          status: 'open'
        }
      ];

      const { getByPlaceholderText } = render(
        <ChatComponent
          initialData={initialData}
          initialActiveConversationId={1}
          disableClosedConversations={true}
        />
      );

      const textarea = getByPlaceholderText(/type your message/i);
      expect(textarea).not.toBeDisabled();
    });
  });

  describe('currentUserId prop', () => {
    it('should sync currentUserId with store', () => {
      const { rerender } = render(
        <ChatComponent currentUserId="user123" />
      );

      const state = useChatStore.getState();
      expect(state.currentUserId).toBe('user123');

      rerender(<ChatComponent currentUserId="user456" />);
      
      const updatedState = useChatStore.getState();
      expect(updatedState.currentUserId).toBe('user456');
    });
  });
});
