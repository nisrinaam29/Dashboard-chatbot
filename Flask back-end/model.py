import torch
from transformers import BertTokenizer, BertForSequenceClassification


model_name = "bert-base-multilingual-uncased"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name, num_labels=12)
device = torch.device("mps")
model2 = BertForSequenceClassification.from_pretrained(model_name, num_labels=2)
# Load the saved model
model.load_state_dict(torch.load('banking77.pth', map_location=device))
model2.load_state_dict(torch.load('greetings.pth', map_location=device))
model.load_state_dict(torch.load('banking77.pth', map_location=device))
model2.load_state_dict(torch.load('.greetings.pth', map_location=device))

#mac
#others
# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
model.eval()
model2.to(device)
model2.eval()

def tokenize_text(text):
    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        truncation=True,
        padding='max_length',
        max_length=128,
        return_attention_mask=True,
        return_tensors='pt'
    )
    return encoding['input_ids'].to(device), encoding['attention_mask'].to(device)

def predict(text):
    input_ids, attention_mask = tokenize_text(text)
    
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
        predictions = torch.argmax(outputs.logits, dim=1).item()
    
    return predictions

def greetings(text):
    input_ids, attention_mask = tokenize_text(text)
    with torch.no_grad():
        outputs = model2(input_ids, attention_mask=attention_mask)
        predictions = torch.argmax(outputs.logits, dim=1).item()
    
    return predictions