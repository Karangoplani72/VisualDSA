from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)

# ---------------- ROUTES ---------------- #

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data-structures')
def data_structures():
    return render_template('data_structures.html')

@app.route('/visualize')
def visualize():
    return render_template('visualize.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/stack')
def stack_page():
    return render_template('stack.html')

@app.route('/queue')
def queue():
    return render_template('queue.html')

@app.route('/tree')
def tree():
    return render_template('tree.html')

@app.route('/graph')
def graph():
    return render_template('graph.html')

@app.route('/array')
def array():
    return render_template('array.html')

@app.route('/linked-list')
def linked_list():
    return render_template('linked_list.html')

@app.route('/heap')
def heap():
    return render_template('heap.html')

@app.route('/hash-table')
def hash_table():
    return render_template('hash_table.html')

# ---------------- STACK VISUALIZATION LOGIC ---------------- #

stack_data = []

@app.route('/api/stack/push', methods=['POST'])
def stack_push():
    """Push an element into the stack"""
    data = request.json
    value = data.get("value")
    if not value:
        return jsonify({"error": "No value provided"}), 400

    start = time.perf_counter()
    stack_data.append(value)
    end = time.perf_counter()

    return jsonify({
        "stack": stack_data,
        "operation": "push",
        "time_taken_ms": round((end - start) * 1000, 2),
        "complexity": "O(1)"
    })

@app.route('/api/stack/pop', methods=['POST'])
def stack_pop():
    """Pop an element from the stack"""
    start = time.perf_counter()
    if stack_data:
        stack_data.pop()
    end = time.perf_counter()

    return jsonify({
        "stack": stack_data,
        "operation": "pop",
        "time_taken_ms": round((end - start) * 1000, 2),
        "complexity": "O(1)"
    })

@app.route('/api/stack/peek', methods=['GET'])
def stack_peek():
    """Return the top element of the stack"""
    top = stack_data[-1] if stack_data else None
    return jsonify({"top": top, "stack": stack_data, "operation": "peek"})

@app.route('/api/stack/reset', methods=['POST'])
def stack_reset():
    """Clear the entire stack"""
    stack_data.clear()
    return jsonify({"stack": stack_data, "operation": "reset"})

# ---------------- UNIVERSAL API (GENERIC DSA LOGIC) ---------------- #

@app.route('/api/operation', methods=['POST'])
def operation():
    """
    Generic API for performing DSA operations dynamically (used in visualize.html).
    """
    data = request.json
    ds_type = data.get("structure")
    elements = data.get("elements", [])
    op = data.get("operation")
    value = data.get("value")

    start = time.perf_counter()

    try:
        if ds_type == "stack":
            if op == "insert":
                elements.append(value)
            elif op == "delete" and elements:
                elements.pop()

        elif ds_type == "queue":
            if op == "insert":
                elements.append(value)
            elif op == "delete" and elements:
                elements.pop(0)

        elif ds_type == "array":
            if op == "insert":
                elements.append(value)
            elif op == "delete" and elements:
                elements.pop()
            elif op == "sort":
                elements.sort()
            elif op == "search":
                idx = elements.index(value) if value in elements else -1

        else:
            return jsonify({"error": "Unsupported data structure"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    end = time.perf_counter()
    duration = round((end - start) * 1000, 2)

    return jsonify({
        "structure": ds_type,
        "elements": elements,
        "last_operation": op,
        "time_taken_ms": duration,
        "complexity": "O(n)",
        "status": "success"
    })


# ---------------- MAIN ---------------- #
if __name__ == '__main__':
    app.run(debug=True)
