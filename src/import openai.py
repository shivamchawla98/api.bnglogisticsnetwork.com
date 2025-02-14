import os
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key="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",
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Say this is a test",
        }
    ],
    model="gpt-3.5-turbo",
)
print(chat_completion)