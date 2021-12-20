import {
  HttpMethod,
  ProviderInterface,
  AcknowledgementsPayload,
  CreateMessagePayload,
  UploadAttachmentPayload,
  Attachment
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    acknowledgements(
      body: AcknowledgementsPayload
    ): Promise<AcknowledgementsPayload> {
      return provider.send("/acknowledgements", HttpMethod.POST, body);
    },

    getAttachment(id: string): Promise<Attachment> {
      return provider.send(`/attachments/${id}`, HttpMethod.GET);
    },

    sendMessages(body: CreateMessagePayload) {
      return provider.send("/messages", HttpMethod.POST, body);
    },

    uploadAttachment(body: UploadAttachmentPayload): Promise<Attachment> {
      return provider.send("/attachments", HttpMethod.POST, body);
    }
  };
}
