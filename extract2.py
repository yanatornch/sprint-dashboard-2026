def main():
    with open('original_index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    html_lines = []
    css_lines = []
    data_lines = []
    logic_lines = []

    in_style = False
    in_script = False
    in_data = False
    in_logic = False

    for i, line in enumerate(lines):
        line_num = i + 1
        if '<style>' in line:
            in_style = True
            continue
        if '</style>' in line:
            in_style = False
            html_lines.append('<link rel="stylesheet" href="./style.css">\n')
            continue
        if in_style:
            css_lines.append(line)
            continue

        if '<script>' in line:
            in_script = True
            html_lines.append('<script type="module" src="./main.js"></script>\n')
            continue
        if '</script>' in line:
            in_script = False
            continue

        if in_script:
            if line_num == 880:
                in_data = True
            
            if in_data:
                data_lines.append(line)
                if line_num == 2823:
                    in_data = False
                    in_logic = True
            else:
                logic_lines.append(line)
        else:
            html_lines.append(line)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.writelines(html_lines)

    with open('style.css', 'w', encoding='utf-8') as f:
        f.writelines(css_lines)

    with open('data.js', 'w', encoding='utf-8') as f:
        f.write('export ' + ''.join(data_lines))

    with open('main.js', 'w', encoding='utf-8') as f:
        f.write('import { DATA } from "./data.js";\n')
        f.writelines(logic_lines)

if __name__ == '__main__':
    main()
