--- 22-01-2024 21:35:25
--- SQLite.12
SELECT * FROM database;

--- 22-01-2024 21:35:52
--- SQLite.13
SELECT MAX(vendas) AS max_vendas
FROM database;

--- 22-01-2024 21:36:26
--- SQLite.19
SELECT 
    id_marca_,
    vendas,
    valor_do_veiculo,
    vendas * valor_do_veiculo AS Receita
FROM 
    database;

--- 22-01-2024 21:37:00
--- SQLite.20
SELECT
    id_marca_,
    SUBSTR(data, 1, 4) AS ano,
    ROUND(AVG(vendas), 2) AS media_vendas_por_ano
FROM
    database
GROUP BY
    id_marca_, ano;

--- 22-01-2024 21:37:25
--- SQLite.21
SELECT 
    id_marca_,
    SUM(receita) AS TotalReceita,
    SUM(vendas) AS TotalVendas,
    ROUND(SUM(receita) / NULLIF(SUM(vendas), 0), 2) AS RazaoReceitaPorVenda
FROM 
    database
GROUP BY 
    id_marca_
ORDER BY 
    RazaoReceitaPorVenda DESC;

--- 22-01-2024 21:37:50
--- SQLite.22
SELECT 
    nome,
    SUM(vendas) AS TotalVendido
FROM 
    database
GROUP BY 
    nome
ORDER BY 
    TotalVendido DESC;

