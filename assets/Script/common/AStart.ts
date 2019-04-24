
class AStart {
    static instance: AStart = new AStart();

    private MapMaze = [];
    private OpenTable = [];
    private CloseTable = [];
    private PathStack = [];

    private IsFound = 0;
    private OpenNodeCount = 0;
    private CloseNodeCount = 0;
    private Top = -1;

    private MapHeight = 0;
    private MapWidth = 0;
    private BARRIER = 1;

    private swap(index1: number, index2: number) {
        let tmp = this.OpenTable[index1];
        this.OpenTable[index1] = this.OpenTable[index2];
        this.OpenTable[index2] = tmp;
    }

    private adjustHeap(nIndex: number) {
        let curr = nIndex;  
        let child = curr * 2 + 1;   // 得到左孩子idx( 下标从0开始，所有做孩子是curr*2+1 )  
        let parent = Math.floor(( curr - 1 ) / 2);  // 得到双亲idx  
    
        if (nIndex < 0 || nIndex >= this.OpenNodeCount)  {  
            return;  
        }  
        
        // 往下调整( 要比较左右孩子和cuur parent )  
        //   
        while ( child < this.OpenNodeCount )  {  
            // 小根堆是双亲值小于孩子值  
            //   
            if ( child + 1 < this.OpenNodeCount && this.OpenTable[child].s_g + this.OpenTable[child].s_h  > this.OpenTable[child+1].s_g + this.OpenTable[child+1].s_h )  {  
                ++child;// 判断左右孩子大小  
            }  
            
            if (this.OpenTable[curr].s_g + this.OpenTable[curr].s_h <= this.OpenTable[child].s_g + this.OpenTable[child].s_h)  {  
                break;  
            }  
            else  {  
                this.swap( child, curr );            // 交换节点  
                curr = child;               // 再判断当前孩子节点  
                child = curr * 2 + 1;           // 再判断左孩子  
            }  
        }  
        
        if (curr != nIndex) {  
            return;  
        }  
    
        // 往上调整( 只需要比较cuur child和parent )  
        //   
        while (curr != 0) {  
            if (this.OpenTable[curr].s_g + this.OpenTable[curr].s_h >= this.OpenTable[parent].s_g + this.OpenTable[parent].s_h)  
            {  
                break;  
            }  
            else  
            {  
                this.swap( curr, parent );  
                curr = parent;  
                parent = Math.floor((curr-1)/2);  
            }  
        }
    }

    private insertToOpenTable(x: number, y: number, currNode, endNode, w) {
        let  i;  
  
        if ( this.MapMaze[x * this.MapWidth + y].s_style != this.BARRIER )    {      // 不是障碍物  
            if ( !this.MapMaze[x * this.MapWidth + y].s_is_in_closetable )   // 不在闭表中  
            {  
                if ( this.MapMaze[x * this.MapWidth + y].s_is_in_opentable ) // 在open表中  
                {  
                    // 需要判断是否是一条更优化的路径  
                    //   
                    if ( this.MapMaze[x * this.MapWidth + y].s_g > currNode.s_g + w )    // 如果更优化  
                    {  
                        this.MapMaze[x * this.MapWidth + y].s_g = currNode.s_g + w;  
                        this.MapMaze[x * this.MapWidth + y].s_parent = currNode;  
      
                        for ( i = 0; i < this.OpenNodeCount; ++i )  
                        {  
                            if ( this.OpenTable[i].s_x == this.MapMaze[x * this.MapWidth + y].s_x && this.OpenTable[i].s_y == this.MapMaze[x * this.MapWidth + y].s_y )  
                            {  
                                break;  
                            }  
                        }  
      
                        this.adjustHeap(i);                   // 下面调整点  
                    }  
                }  
                else                                    // 不在open中  
                {  
                    this.MapMaze[x * this.MapWidth + y].s_g = currNode.s_g + w;  
                    this.MapMaze[x * this.MapWidth + y].s_h = Math.abs(endNode.s_x - x ) + Math.abs(endNode.s_y - y);  
                    this.MapMaze[x * this.MapWidth + y].s_parent = currNode;  
                    this.MapMaze[x * this.MapWidth + y].s_is_in_opentable = 1;  
                    this.OpenTable[this.OpenNodeCount++] = (this.MapMaze[x * this.MapWidth + y]);  
                }  
            }  
        } 
    }

    private getNeighbors(currNode, endNode) {
        let x = currNode.s_x;  
        let y = currNode.s_y;  
    
        // 下面对于8个邻居进行处理！  
        //   
        if ( ( x + 1 ) >= 0 && ( x + 1 ) < this.MapHeight && y >= 0 && y < this.MapWidth )  
        {  
            this.insertToOpenTable( x+1, y, currNode, endNode, 10 );  
        }  
    
        if ( ( x - 1 ) >= 0 && ( x - 1 ) < this.MapHeight && y >= 0 && y < this.MapWidth )  
        {  
            this.insertToOpenTable( x-1, y, currNode, endNode, 10 );  
        }  
    
        if ( x >= 0 && x < this.MapHeight && ( y + 1 ) >= 0 && ( y + 1 ) < this.MapWidth )  
        {  
            this.insertToOpenTable( x, y+1, currNode, endNode, 10 );  
        }  
    
        if ( x >= 0 && x < this.MapHeight && ( y - 1 ) >= 0 && ( y - 1 ) < this.MapWidth )  
        {  
            this.insertToOpenTable( x, y-1, currNode, endNode, 10 );  
        }  
    }

    private astartInit(map) {
        this.OpenTable = [];
        this.CloseTable = [];
        this.PathStack = [];
        this.MapMaze = [];

        this.MapWidth = map.width;
        this.MapHeight = map.height;

        this.IsFound = 0;
        this.OpenNodeCount = 0;
        this.CloseNodeCount = 0;
        this.Top = -1;

        for(let i = 0; i < map.height; i ++) {
            for(let j = 0; j < map.width; j ++) {
                let node: any = {};
                node.s_g = 0;  
                node.s_h = 0;  
                node.s_is_in_closetable = 0;  
                node.s_is_in_opentable = 0;  
                node.s_style = map.data[i * map.width + j];  
                node.s_x = i;  
                node.s_y = j;  
                node.s_parent = null;  
                this.MapMaze.push(node);
    
                this.PathStack.push(null);
                this.OpenTable.push(null);
                this.CloseTable.push(null);
            }
        }
    }

    public astartSearch(map, srcX, srcY, dstX, dstY) {
        var path = [];
        if (srcX == dstX && srcY == dstY)  {  
            console.log("起点==终点!");  
            return path;  
        } 
    
        console.log(srcX, srcY, dstX, dstY);
    
        this.astartInit(map);
    
        var start_node = this.MapMaze[srcY * map.width + srcX];
        var end_node = this.MapMaze[dstY * map.width + dstX];
        var curr_node = null;
    
        this.OpenTable[this.OpenNodeCount++] = start_node;
    
        start_node.s_is_in_opentable = 1;               // 加入open表  
        start_node.s_g = 0;  
        start_node.s_h = Math.abs(end_node.s_x - start_node.s_x) + Math.abs(end_node.s_y - start_node.s_y);  
        start_node.s_parent = null;  
    
        this.IsFound = 0;
        while( 1 )   {  
            curr_node = this.OpenTable[0];      // open表的第一个点一定是f值最小的点(通过堆排序得到的)  
            this.OpenTable[0] = this.OpenTable[--this.OpenNodeCount];  // 最后一个点放到第一个点，然后进行堆调整  
            this.adjustHeap( 0 );               // 调整堆  
              
            this.CloseTable[this.CloseNodeCount++] = curr_node;    // 当前点加入close表  
            curr_node.s_is_in_closetable = 1;       // 已经在close表中了  
      
            if ( curr_node.s_x == end_node.s_x && curr_node.s_y == end_node.s_y )// 终点在close中，结束  
            {  
                this.IsFound = 1;  
                break;  
            }  
      
            this.getNeighbors( curr_node, end_node );           // 对邻居的处理  
      
            if ( this.OpenNodeCount == 0 )             // 没有路径到达  
            {  
                this.IsFound = 0;  
                break;  
            }  
        }  
      
        if ( this.IsFound )  
        {  
            curr_node = end_node;  
              
            while( curr_node )  
            {  
                this.PathStack[++this.Top] = curr_node;  
                curr_node = curr_node.s_parent;  
            }  
      
            while( this.Top >= 0 )        // 下面是输出路径看看~  
            {  
                // console.log(path_stack[top].s_y, path_stack[top].s_x);
                path.push(cc.v2(this.PathStack[this.Top].s_y, this.PathStack[this.Top].s_x));
                this.Top --;
            }  
        }  
        else  
        {  
            console.log("没有找到路径");  
        }  
        return path;
    }

}

export default AStart.instance;