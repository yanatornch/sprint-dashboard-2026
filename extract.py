import re

def main():
    with open('original_index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract CSS
    style_match = re.search(r'<style>\s*(.*?)\s*</style>', content, re.DOTALL)
    css = style_match.group(1) if style_match else ''

    # Extract JS
    script_match = re.search(r'<script>\s*(.*?)\s*</script>', content, re.DOTALL)
    js = script_match.group(1) if script_match else ''

    # Modify HTML
    html = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="/style.css">', content, flags=re.DOTALL)
    html = re.sub(r'<script>.*?</script>', '<script type="module" src="/main.js"></script>', html, flags=re.DOTALL)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css)

    # Find DATA object by brace matching
    data_start = js.find('const DATA = {')
    if data_start != -1:
        brace_count = 0
        data_end = -1
        in_string = False
        escape = False
        
        for i in range(data_start + 13, len(js)):
            c = js[i]
            if escape:
                escape = False
                continue
            if c == '\\':
                escape = True
                continue
            if c == '"' or c == "'":
                in_string = not in_string
                continue
            
            if not in_string:
                if c == '{':
                    brace_count += 1
                elif c == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        data_end = i + 1
                        # check for ;
                        if i + 1 < len(js) and js[i+1] == ';':
                            data_end += 1
                        break
        
        if data_end != -1:
            data_str = js[data_start:data_end]
            logic_str = js[:data_start] + js[data_end:]
            
            with open('data.js', 'w', encoding='utf-8') as f:
                f.write(data_str.replace('const DATA =', 'export const DATA ='))
                
            with open('main.js', 'w', encoding='utf-8') as f:
                f.write("import { DATA } from './data.js';\n" + logic_str)
        else:
            print("Failed to find end of DATA")
    else:
        print("Failed to find DATA")

if __name__ == '__main__':
    main()
