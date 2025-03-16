from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load Excel file
df = pd.read_excel("Student.xlsx")
print("Loaded student names:", df["Name"].tolist())  # Print all names in terminal
df["Name"] = df["Name"].str.strip()# Normalize names
 # Remove spaces at the start and end

@app.route('/')
def home():
    return "Welcome to the Student Portal!"
@app.route('/get_student', methods=['GET'])
def get_student():
    query = request.args.get("query", "").strip().lower()

    if not query:
        return jsonify({"message": "No input provided!"}), 400

    # Convert Register Numbers to String for Matching
    df["Register Number"] = df["Register Number"].astype(str).str.strip()
    print("Searching for:", query)
    print("Available Register Numbers:", df["Register Number"].tolist())
    print("Available Names:", df["Name"].tolist())
    # Search by Name (case-insensitive)
    student_by_name = df[df["Name"].str.lower() == query]

    # Search by Register Number (case-sensitive)
    student_by_reg = df[df["Register Number"].str.lower() == query]

    if not student_by_name.empty:
        student_dict = student_by_name.iloc[0].to_dict()
    elif not student_by_reg.empty:
        student_dict = student_by_reg.iloc[0].to_dict()
    else:
        return jsonify({"message": "Student not found!"}), 404

    student_dict = {k: (None if pd.isna(v) else v) for k, v in student_dict.items()}
    return jsonify(student_dict)
@app.route('/get_statistics', methods=['GET'])
def get_statistics():
    stats = {}

    # Total students per Year
    year_counts = df['Year'].value_counts().to_dict()
    stats['year_counts'] = year_counts

    # Average CGPA
    df['CGPA'] = pd.to_numeric(df['CGPA'], errors='coerce')  # Convert CGPA to numeric
    avg_cgpa = df['CGPA'].mean()
    stats['average_cgpa'] = round(avg_cgpa, 2)

    # Tech Stack Popularity
    tech_list = df["Teck Stack Known "].dropna().tolist()
    tech_counter = {}

    for techs in tech_list:
        for tech in techs.split("\n"):
            tech = tech.strip()
            if tech:
                tech_counter[tech] = tech_counter.get(tech, 0) + 1
    stats['tech_stack'] = tech_counter

    return jsonify(stats)




if __name__ == "__main__":
    app.run(debug=True)